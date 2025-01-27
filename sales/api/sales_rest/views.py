from django.shortcuts import render
from common.json import ModelEncoder
import json
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.core.exceptions import ObjectDoesNotExist
from .models import AutomobileVO, Sale, Customer, Salesperson
import requests

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "sold",
    ]


class SalespersonEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "first_name",
        "last_name",
        "employee_id",
        "id"
    ]


class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "first_name",
        "last_name",
        "address",
        "phone_number",
        "id"
    ]


class SalesEncoder(ModelEncoder):
    model = Sale
    properties = [
        "automobile",
        "salesperson",
        "customer",
        "price",
        "id"
    ]
    encoders = {
        "automobile": AutomobileVOEncoder(),
        "salesperson": SalespersonEncoder(),
        "customer": CustomerEncoder()
    }

@require_http_methods(["GET", "POST"])
def salespeople_list(request):

    if request.method == "GET":
        salespeople = Salesperson.objects.all()
        return JsonResponse(
            {"salespeople": salespeople},
            encoder=SalespersonEncoder,
        )

    else:
        try:
            content = json.loads(request.body)
            salesperson = Salesperson.objects.create(**content)
            return JsonResponse(
                salesperson,
                encoder=SalespersonEncoder,
                safe=False,
            )
        except:
            return JsonResponse(
                {"message": "Failed to create salesperson"},
                status=400
            )


@require_http_methods(["DELETE", "GET"])
def salespeople_detail(request, pk):
    if request.method == "GET":
        salesperson = Salesperson.objects.get(id=pk)
        return JsonResponse(
            {"salesperson": salesperson},
            encoder=SalespersonEncoder,
            safe=False,
        )
    else:
        request.method == "DELETE"
        try:
            count, _ = Salesperson.objects.filter(id=pk).delete()
            return JsonResponse({"deleted": count > 0})
        except ObjectDoesNotExist:
            return JsonResponse({"error": "Salesperson not found"}, status=404)



@require_http_methods(["GET", "POST"])
def customers_list(request):

    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerEncoder,
        )

    else:
        try:
            content = json.loads(request.body)
            customer = Customer.objects.create(**content)
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
            )
        except:
            return JsonResponse(
                {"message": "Failed to create customer"},
                status=400
            )


@require_http_methods(["DELETE", "GET"])
def customers_detail(request,pk):
    if request.method == "GET":
        customer = Customer.objects.get(id=pk)
        return JsonResponse(
            {"customer": customer},
            encoder=CustomerEncoder,
            safe=False,
        )
    else:
        request.method == "DELETE"
        try:
            count, _ = Customer.objects.filter(id=pk).delete()
            return JsonResponse({"deleted": count > 0})
        except ObjectDoesNotExist:
            return JsonResponse({"error": "Customer not found"}, status=404)



@require_http_methods(["GET", "POST"])
def sales_list(request):

    if request.method == "GET":
        try:

            sales = Sale.objects.all()
            return JsonResponse(
                {"sales": sales},
                encoder=SalesEncoder,
            )
        except Exception as e:
            return JsonResponse(
                {"message": f"Error fetching sales: {str(e)}"},
                status=400,
            )

    elif request.method == "POST":

        try:
            content = json.loads(request.body)

            automobile = AutomobileVO.objects.get(vin=content["automobile"])
            if automobile.sold:
                return JsonResponse(
                    {"message": "This automobile has already been sold"},
                    status=400,
                )

            salesperson = Salesperson.objects.get(id=content["salesperson"])
            customer = Customer.objects.get(id=content["customer"])

            sale = Sale.objects.create(
                automobile = automobile,
                salesperson=salesperson,
                customer=customer,
                price=float(content["price"]),
            )

            try:
                response = requests.put(
                    f'http://inventory-api:8000/api/automobiles/{automobile.vin}/',
                    json={"sold": True},
                    headers={'Content-Type': 'application/json'},
                )

                if response.ok:
                    return JsonResponse(
                        {"sale": sale},
                        encoder=SalesEncoder,
                        status=201
                    )

                else:
                    print(f"Inventory update failed: {response.status_code} - {response.text}")
                    sale.delete()
                    return JsonResponse(
                        {"message": f"Failed to update automobile status in inventory: {response.text}"},
                        status=400
                    )

            except requests.RequestException as e:
                print(f"Request failed: {str(e)}")
                sale.delete()
                return JsonResponse(
                    {"message": f"Failed to communicate with inventory service: {str(e)}"},
                    status=500
                )

        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Automobile not found"},
                status=404
            )
        except Exception as e:
            print(f"Sale creation failed: {str(e)}")
            return JsonResponse(
                {"message": f"Error creating sale: {str(e)}"},
                status=500
            )



@require_http_methods(["DELETE", "GET"])
def sale_detail(request, pk):

    if request.method == "GET":
        sale = Sale.objects.get(id=pk)
        return JsonResponse(
            {"sale": sale},
            encoder=SalesEncoder,
            safe=False,
        )

    else:
        if request.method == "DELETE":
            try:
                count, _ = Sale.objects.filter(id=pk).delete()
                return JsonResponse({"deleted": count > 0})
            except ObjectDoesNotExist:
                return JsonResponse({"error": "Sale not found"}, status=404)


@require_http_methods(["GET"])
def salesperson_history(request, pk):
    if request.method == "GET":
        try:
            salesperson = Salesperson.objects.get(id=pk)
            sales = Sale.objects.filter(salesperson=salesperson)

            return JsonResponse(
                {"sales": sales},
                encoder=SalesEncoder,
            )
        except Salesperson.DoesNotExist:
            return JsonResponse({"message": "Salesperson not found"}, status=404)
        except Exception as e:
            return JsonResponse({"message": str(e)}, status=500)
