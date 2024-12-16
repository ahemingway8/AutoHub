from django.urls import path
from .views import salespeople_list, salespeople_detail, customers_list, customers_detail, sales_list, sale_detail, salesperson_history

urlpatterns = [
    path("salespeople/", salespeople_list, name="salespeople_list"),
    path("salespeople/create", salespeople_list, name="salespeople_create"),
    path("salespeople/<int:pk>/", salespeople_detail, name="salespeople_delete"),
    path("salespeople/<int:pk>/", salespeople_detail, name="salespeople_detail"),
    path("customers/", customers_list, name="customers_list"),
    path("customers/create", customers_list, name="customers_create"),
    path("customers/<int:pk>/", customers_detail, name="customers_delete"),
    path("customers/<int:pk>/", customers_detail, name="customers_detail"),
    path("sales/", sales_list, name="sales_list"),
    path("sales/create", sales_list, name="sales_create"),
    path("sales/<int:pk>/", sale_detail, name="sale_delete"),
    path("sales/<int:pk>/", sale_detail, name="sale_detail"),
    path("saleshistory/<int:pk>/", salesperson_history, name="salesperson_history"),
]
