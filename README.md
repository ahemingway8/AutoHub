# CarCar

CarCar is an application that manages the inventory, sales of automobiles, and automobile services for an  an automobile dealership.

Team:

* April Hemingway - Sales
* Luciano Whitehurst - Appointments


## How to Run this App

1. Fork the repository:
    https://gitlab.com/Eric.Whitehurst/project-beta.git


2. Clone the forked repository:
   - git clone <<https://gitlab.com/Eric.Whitehurst/project-beta.git>>


3. Build docker containers and run them:
    - docker volume create beta-data
    - docker-compose build
    - docker-compose up

4. Make sure all of the containers are running

5. Project can be viewed in the browser at: http://localhost:5173/

### Description:
There is an inventory of all the cars. We are polling information from the inventory domain to our sales microservice and service microservice to store past sales and service histroy. As well as update the information when prompted by a request.


## Design




## API Documentation

### Manufacturers:

- GET: List Manufacturers
    - URL: http://localhost:8100/api/manufacturers/

- POST: Create Manufacturer
    - URL: http://localhost:8100/api/manufacturers/
    - JSON body:

        {
            " name" : "Audi"
        }
    - Response data:
        - After sending a POST request your data should respond with this:

        {
            "href": "/api/manufacturers/2/",
            "id": 2,
            "name": "Audi"
        }


- GET: Get details of a manufacturer
    - Takes in the id of an individual manufacturer and rests the response data for it.
    - URL: http://localhost:8100/api/manufactuers/id/


- DELETE: Delete a manufacturer
    - Takes in the id of an individual manufacturer and deletes it
    - URL: http://localhost:8100/api/manufactuers/id/
-
### Vehicle Model
- GET: List Vehicle Models
    - URL: http://localhost:8100/api/models/
- POST: Create a vehicle model
    - URL: http://localhost:8100/api/models/
    - Json body:
        {
            "name": "A4 quattro",
            "picture_url": "https://images.fitmentindustries.com/web-compressed/1815312-1-2013-a4-quattro-audi-premium-kw-coilovers-apr-a01-matte-black.jpg",
            "manufacturer_id": 2
        }
    - Response data:
        {
	        "href": "/api/models/2/",
            "id": 2,
            "name": "A4 quattro",
            "picture_url": "https://images.fitmentindustries.com/web-compressed/1815312-1-2013-a4-quattro-audi-premium-kw-coilovers-apr-a01-matte-black.jpg",
            "manufacturer": {
                "href": "/api/manufacturers/2/",
                "id": 2,
                "name": "Audi"
            }
        }
- GET: Get details of a vehicle model
    - Takes in the id of an individual vehicle model and gets the       response data for it.
    - URL: http://localhost:8100/api/models/id/
- DELETE: Delete a vehicle model
    - Takes in the id of an individual vehicle model and deletes it.
    - URL: http://localhost:8100/api/models/id/

### Automobile




###





## Service microservice

Explain your models and integration with the inventory
microservice, here.

## Sales microservice

Explain your models and integration with the inventory
microservice, here.

The Sales microservice models are the salesperson model, customer model, sales model, and the automobileVO model. The automobileVO is needed to get the data of the automobiles through the sales poller. The sales poller is needed because the automobiles models is in the inventory microservice. This is important for being able to get data such as an automobile's vin and its sold status. This is then used to be able to identify an automobile by its vin and update the sold status of the automobile.


### API Documentation and Microservices Interaction

- In Insomnia, input the url and choose the HTTP method given (GET, POST, DELETE). Input JSON body for the POST methods. When you send the request, check to see if the response data corresponds to the response data listed below.

## Salespeople

- POST: Create a salesperson
    - The employee_id must be unique. If you try to create a salesperson with an employee_id that already exists, it will throw back an error.
    - URL: http://localhost:8090/api/salespeople/
    - JSON body:
    ```
    	{
			"first_name": "Jane",
			"last_name": "Doe",
			"employee_id": "jdoe",
		}
    ```
    - Response data:
    ```
    	{
			"first_name": "Jane",
			"last_name": "Doe",
			"employee_id": "jdoe",
			"id": 1
		}
    ```
- GET: Get the list of all of the salespeople
    - URL: http://localhost:8090/api/salespeople/
    - Response data:
    ```
    {
        "salespeople": [
            {
                "first_name": "Jane",
                "last_name": "Doe",
                "employee_id": "jdoe",
                "id": 1
            },
            {
                "first_name": "John",
                "last_name": "Smith",
                "employee_id": "jsmith",
                "id": 2
            }
        ]
    }
    ```
- GET: Get the details of a specific salesperson based on their ID
    - URL: http://localhost:8090/api/salespeople/id/
    - Response Data Example (if id is 2):
    ```
        {
            "first_name": "John",
            "last_name": "Smith",
            "employee_id": "jsmith",
            "id": 2
        }
    ```
- DELETE: Delete a specific salesperson based on their ID
    - URL: http://localhost:8090/api/salespeople/id/
    - Response data:
        - If the salesperson was deleted there will be a response of:
        ```
            {
	            "deleted": true
            }
        ```
        - If you try to delete a salesperson with an ID that does not exist, the response will be:
        ```
            {
	            "deleted": false
            }
        ```

## Customers

- POST: Create a customer
    - The phone_number field is a charfield, therefore, dashes are allowed.
    - URL: http://localhost:8090/api/customers/
    - JSON body:
    ```
        {
        "first_name": "Orange",
        "last_name": "Juice",
        "address": "2345 Orange Dr., Orange, CO",
            "phone_number": "234-567-8901"
        }
    ```
    - Response data:
    ```
        {
            "first_name": "Orange",
            "last_name": "Juice",
            "address": "2345 Orange Dr., Orange, Colorado",
            "phone_number": "234-567-8901",
            "id": 1
        }
    ```
- GET: Get the list of all of the customers
    - URL: http://localhost:8090/api/customers/
    ```
    {
        "customers": [
            {
                "first_name": "Orange",
                "last_name": "Juice",
                "address": "2345 Orange Dr., Orange, Colorado",
                "phone_number": "234-567-8901",
                "id": 1
            },
            {
                "first_name": "Blue",
                "last_name": "Berry",
                "address": "3456 Blue Dr., Blue, CO",
                "phone_number": "345-678-9012",
                "id": 2
            }
        ]
    }
    ```
- GET: Get the details of a specific customer based on their ID
    - URL: http://localhost:8090/api/customers/id/
    - Response Data Example (if id: 2):
    ```
        {
            "first_name": "Blue",
            "last_name": "Berry",
            "address": "3456 Blue Dr., Blue, CO",
            "phone_number": "345-678-9012",
            "id": 2
        }
    ```
- DELETE: Delete a specific customer based on their ID
    - URL: http://localhost:8090/api/customers/id/
    - Response data:
        - If the customer was deleted there will be a response of:
        ```
            {
	            "deleted": true
            }
        ```
        - If you try to delete a customer with an ID that does not exist, the response will be:
        ```
            {
	            "deleted": false
            }
        ```

## Sales

- POST: Create a sale
    - automobile: A CharField that represents the VIN of the automobile. The VIN should be a max of 14 characters and must match an existing automobile in the database.
    - salesperson: Represents the id number of a salesperson that must correspond to an existing Salesperson in the database.
    - customer: Represents the id of a customer that must correspond to an existing Customer in the database.
    - price: A float that represents the sale price of the automobile.
    - URL: http://localhost:8090/api/sales/
    - JSON body:
    ```
        {
        "automobile": "1J34LM5D93BVM2",
        "salesperson": "5",
        "customer": "7",
            "price": 20000.00
        }
    ```
    - Response data:
    ```
    {
        "automobile": {
            "vin": "1J34LM5D93BVM2",
            "sold": true
        },
        "salesperson": {
            "first_name": "John",
            "last_name": "Smith",
            "employee_id": "jsmith",
            "id": 2
        },
        "customer": {
            "first_name": "Blue",
            "last_name": "Berry",
            "address": "3456 Blue Dr., Blue, CO",
            "phone_number": "345-678-9012",
            "id": 2
        },
        "price": 20000.0,
        "id": 2
    }
    ```
- GET: Get the list of all of the sales
    - URL: http://localhost:8090/api/sales/
    ```
    {
        "sales": [
            {
                "automobile": {
                    "vin": "1C3CC5FB2AN120174",
                    "sold": true
                },
                "salesperson": {
                    "first_name": "Jane",
                    "last_name": "Doe",
                    "employee_id": "jdoe",
                    "id": 4
                },
                "customer": {
                    "first_name": "Orange",
                    "last_name": "Juice",
                    "address": "2345 Orange Dr., Orange, Colorado",
                    "phone_number": "234-567-8901",
                    "id": 6
                },
                "price": 25000.0,
                "id": 1
            },
            {
                "automobile": {
                    "vin": "1J34LM5D93BVM2",
                    "sold": false
                },
                "salesperson": {
                    "first_name": "John",
                    "last_name": "Smith",
                    "employee_id": "jsmith",
                    "id": 5
                },
                "customer": {
                    "first_name": "Blue",
                    "last_name": "Berry",
                    "address": "3456 Blue Dr., Blue, CO",
                    "phone_number": "345-678-9012",
                    "id": 7
                },
                "price": 9.0,
                "id": 2
            }
        ]
    }

    ```
- GET: Get the details of a specific sale based on the ID
    - URL: http://localhost:8090/api/sales/id/
    - Response Data Example (if id: 1):
    ```
        {
            "automobile": {
                "vin": "1C3CC5FB2AN120174",
                "sold": true
            },
            "salesperson": {
                "first_name": "Jane",
                "last_name": "Doe",
                "employee_id": "jdoe",
                "id": 4
            },
            "customer": {
                "first_name": "Orange",
                "last_name": "Juice",
                "address": "2345 Orange Dr., Orange, Colorado",
                "phone_number": "234-567-8901",
                "id": 6
            },
            "price": 25000.0,
            "id": 1
        }
    ```
- DELETE: Delete a specific sale based on the ID
    - URL: http://localhost:8090/api/sales/id/
    - Response data:
        - If the sale was deleted there will be a response of:
        ```
            {
	            "deleted": true
            }
        ```
        - If you try to delete a sale with an ID that does not exist, the response will be:
        ```
            {
	            "deleted": false
            }
        ```
