from django.shortcuts import render
from common.json import ModelEncoder
import json
import requests
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.core.exceptions import ObjectDoesNotExist
from .models import AutomobileVO, Sale, Customer, Salesperson

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
            print("Request body content:", content)


            automobile = AutomobileVO.objects.get(vin=content["automobile"])

            print(f"Found automobile with VIN: {automobile.vin}")


            #if automobile.sold:
                 #return JsonResponse(
                    #{"message": "This automobile has already been sold"},
                    #status=400,
                #)



            salesperson = Salesperson.objects.get(id=content["salesperson"])
            print(f"Salesperson found: {salesperson.first_name} {salesperson.last_name}")

            customer = Customer.objects.get(id=content["customer"])
            print(f"Customer found: {customer.first_name} {customer.last_name}")


            sale = Sale.objects.create(
                automobile = automobile,
                salesperson=salesperson,
                customer=customer,
                price=float(content["price"]),
            )
            print(f"Sale created for automobile {automobile.vin} with price: {sale.price}")


            return JsonResponse(
                {"sale": sale},
                encoder=SalesEncoder,
                status=201
            )
        except Exception as e:
            return JsonResponse(
                {"message": f"Error creating sale: {str(e)}"},
                status=500,
            )

""""
            automobile_update_url = f"http://inventory-api:8000/api/automobiles/{vin}/"

            try:
                response = requests.put(
                    automobile_update_url,
                    json={"sold": True},
                    headers={"Content-Type": "application/json"}
                )
                print(f"PUT request to {automobile_update_url}, Response Status: {response.status_code}, Response Body: {response.text}")

                if response.status_code !=200:
                    print(f"Error updating automobile: {response.status_code}, Resposne Text: {response.text}")
                    return JsonResponse(
                        {"message": f"Error updating automobile status: {response.text}"},
                        status=500,
                    )
            except requests.exceptions.RequestException as e:
                print(f"Error in request: {e}")
                return JsonResponse({"message": "Error updating automobnile status"}, status=500)

            return JsonResponse(
                {"sale": sale},
                encoder=SalesEncoder,
                status=201
            )


        except AutomobileVO.DoesNotExist:
            return JsonResponse({"message": "Invalid vin"}, status=400)
        except Salesperson.DoesNotExist:
            return JsonResponse({"message": "Invalid salesperson id"}, status=400)
        except Customer.DoesNotExist:
            return JsonResponse({"message": "Invalid customer id"}, status=400)
        except Exception as e:
            return JsonResponse(
                {"message": f"Error creating sale: {str(e)}"},
                status=500,
            )
"""



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
