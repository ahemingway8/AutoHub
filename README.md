# AutoHub

AutoHub is an application that manages the inventory, sales of automobiles, and automobile services for an  an automobile dealership.


## How to Run this App

1. Fork the repository:
    https://gitlab.com/ahemingway/autohub.git


2. Clone the forked repository:
   - git clone <<https://gitlab.com/ahemingway/autohub.git>>


3. Build docker containers and run them:
    - docker volume create beta-data
    - docker-compose build
    - docker-compose up

4. Make sure all of the containers are running

5. Project can be viewed in the browser at: http://localhost:5173/

### Description:
There is an inventory of all the cars. We are polling information from the inventory domain to our sales microservice and service microservice to store past sales and service histroy. As well as update the information when prompted by a request.


## Design

![img](./images/CarCar%20DDD%20Final.png)

## API Documentation

### Manufacturers:

- GET: List Manufacturers
    - URL: http://localhost:8100/api/manufacturers/
    - Response data:
    ```
        {
            "manufacturers": [
                {
                    "href": "/api/manufacturers/1/",
                    "id": 1,
                    "name": "Chrysler"
                },
                {
                    "href": "/api/manufacturers/2/",
                    "id": 2,
                    "name": "Audi"
                }
            ]
        }
    ```

- POST: Create Manufacturer
    - URL: http://localhost:8100/api/manufacturers/
    - JSON body:
        - name: Is a CharField and must be unique. Will send an error if it is the same as another manufacturer in the database.
    ```
        {
            " name" : "Audi"
        }
    ```
    - Response data:
        - After sending a POST request your data should respond with this:
    ```
        {
            "href": "/api/manufacturers/2/",
            "id": 2,
            "name": "Audi"
        }
    ```

- GET: Get details of a manufacturer
    - Takes in the id of an individual manufacturer and rests the response data for it.
    - URL: http://localhost:8100/api/manufacturers/id/
    - Response data:
    ```
        {
            "href": "/api/manufacturers/1/",
            "id": 1,
            "name": "Chrysler"
        }
    ```


- DELETE: Delete a manufacturer
    - Takes in the id of an individual manufacturer and deletes it
    - URL: http://localhost:8100/api/manufacturers/id/
    - Response data:
        - If the manufacturer was deleted there will be a response of:
        ```
            {
	            "deleted": true
            }
        ```
        - If you try to delete a manufacturer with an ID that does not exist, the response will be:
        ```
            {
	            "deleted": false
            }
        ```

### Vehicle Model
- GET: List Vehicle Models
    - URL: http://localhost:8100/api/models/
    - Response data:
    ```
    {
        "models": [
            {
                "href": "/api/models/1/",
                "id": 1,
                "name": "Sebring",
                "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
                "manufacturer": {
                    "href": "/api/manufacturers/1/",
                    "id": 1,
                    "name": "Chrysler"
                }
            },
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
        ]
    }
    ```
- POST: Create a vehicle model
    - URL: http://localhost:8100/api/models/
    - Json body:
    ```
        {
            "name": "A4 quattro",
            "picture_url": "https://images.fitmentindustries.com/web-compressed/1815312-1-2013-a4-quattro-audi-premium-kw-coilovers-apr-a01-matte-black.jpg",
            "manufacturer_id": 2
        }
    ```
    - Response data:
    ```
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
    ```
- GET: Get details of a vehicle model
    - Takes in the id of an individual vehicle model and gets the       response data for it.
    - URL: http://localhost:8100/api/models/id/
    - Response data (for an id of 1):
    ```
        {
            "href": "/api/models/1/",
            "id": 1,
            "name": "Sebring",
            "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
            "manufacturer": {
                "href": "/api/manufacturers/1/",
                "id": 1,
                "name": "Chrysler"
            }
        }
    ```
- DELETE: Delete a vehicle model
    - Takes in the id of an individual vehicle model and deletes it.
    - URL: http://localhost:8100/api/models/id/
    - Response data:
    - If the vehicle model was deleted there will be a response of:
    ```
        {
            "deleted": true
        }
    ```
    - If you try to delete a vehicle model with an ID that does not exist, the response will be:
    ```
        {
            "deleted": false
        }
    ```

### Automobile

- GET: List of Automobiles
    - URL: http://localhost:8100/api/automobiles/
    - Response data:
    ```
    {
        "autos": [
            {
                "href": "/api/automobiles/1C3CC5FB2AN120174/",
                "id": 1,
                "color": "red",
                "year": 2012,
                "vin": "1C3CC5FB2AN120174",
                "model": {
                    "href": "/api/models/1/",
                    "id": 1,
                    "name": "Sebring",
                    "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
                    "manufacturer": {
                        "href": "/api/manufacturers/1/",
                        "id": 1,
                        "name": "Chrysler"
                    }
                },
                "sold": true
            },
            {
                "href": "/api/automobiles/1J34LM5D93BVM2/",
                "id": 2,
                "color": "black",
                "year": 2013,
                "vin": "1J34LM5D93BVM2",
                "model": {
                    "href": "/api/models/2/",
                    "id": 2,
                    "name": "A4 quattro",
                    "picture_url": "https://images.fitmentindustries.com/web-compressed/1815312-1-2013-a4-quattro-audi-premium-kw-coilovers-apr-a01-matte-black.jpg",
                    "manufacturer": {
                        "href": "/api/manufacturers/2/",
                        "id": 2,
                        "name": "Audi"
                    }
                },
                "sold": true
            }
        ]
    }
    ```
- POST: Create an automobile
    - URL: http://localhost:8100/api/automobiles/
    - Json body:
        - Vin: Is a CharField and must be unique. If there is the same vin number in the database it will throw back an error.
        - Model_id: Is an integer and is the id for a vechicle model.
    ```
        {
        "color": "red",
        "year": 2012,
        "vin": "1C3CC5FB2AN120174",
        "model_id": 1
        }
    ```
    - Response data:
    ```
    {
        "href": "/api/automobiles/1C3CC5FB2AN120174/",
        "id": 1,
        "color": "red",
        "year": 2012,
        "vin": "1C3CC5FB2AN120174",
        "model": {
            "href": "/api/models/1/",
            "id": 1,
            "name": "Sebring",
            "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
            "manufacturer": {
                "href": "/api/manufacturers/1/",
                "id": 1,
                "name": "Chrysler"
            }
        },
        "sold": false
    }
    ```
- GET: Get details of an automobile
    - Takes in the vin of an individual automobile and gets the       response data for it. The VIN is unique to each automobile and is the id for the vehicle.
    - URL: http://localhost:8100/api/automobiles/vin/
    - Example URL: http://localhost:8100/api/automobiles/1C3CC5FB2AN120174/

    - Response data (for a vin of 1C3CC5FB2AN120174):
    ```
        {
            "href": "/api/automobiles/1C3CC5FB2AN120174/",
            "id": 1,
            "color": "red",
            "year": 2012,
            "vin": "1C3CC5FB2AN120174",
            "model": {
                "href": "/api/models/1/",
                "id": 1,
                "name": "Sebring",
                "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
                "manufacturer": {
                    "href": "/api/manufacturers/1/",
                    "id": 1,
                    "name": "Chrysler"
                }
            },
            "sold": true
        }
    ```
- DELETE: Delete a vehicle model
    - Takes in the vin of an individual automoobile and deletes it.
    - URL: http://localhost:8100/api/automobiles/vin/
    - Response data:
    - If the automobile was deleted there will be a response of:
    ```
        {
            "deleted": true
        }
    ```
    - If you try to delete a automobile with a VIN that does not exist, the response will be:
    ```
        {
            "deleted": false
        }
    ```


###


## Sales microservice

The Sales microservice models are the salesperson model, customer model, sales model, and the automobileVO model. The automobileVO is needed to get the data of the automobiles through the sales poller. The sales poller is needed because the automobiles models is in the inventory microservice. This is important for being able to get data such as an automobile's vin and its sold status. This is then used to be able to identify an automobile by its vin and update the sold status of the automobile.


## API Documentation and Microservices Interaction

- In Insomnia, input the url and choose the HTTP method given (GET, POST, DELETE). Input JSON body for the POST methods. When you send the request, check to see if the response data corresponds to the response data listed below.

### Salespeople

- POST: Create a salesperson
    - URL: http://localhost:8090/api/salespeople/
    - JSON body:
        - The employee_id must be unique. If you try to create a salesperson with an employee_id that already exists, it will throw back an error.
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

### Customers

- POST: Create a customer
    - URL: http://localhost:8090/api/customers/
    - JSON body:
        - The phone_number field is a charfield, therefore, dashes are allowed.
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

### Sales

- POST: Create a sale
    - URL: http://localhost:8090/api/sales/
    - JSON body:
        - automobile: A CharField that represents the VIN of the automobile. The VIN should be a max of 14 characters and must match an existing automobile in the database.
        - salesperson: Represents the id number of a salesperson that must correspond to an existing Salesperson in the database.
        - customer: Represents the id of a customer that must correspond to an existing Customer in the database.
        - price: A float that represents the sale price of the automobile.
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
## Service microservice

The Service microservice uses a technician model, and autombileVO model, and an appointment model. The Technician model contains the first_name, last_name, and employee_id. The Appointment model contains date_time, reason (reason for the appointment), status (if the appointment is created, finished, or cancelled), customer (customer's name), technician (key related to the technician model), and the vin. The AutomobileVO is needed to get data from the Inventory microservice's Automobile model. The vin is taken from the inventory to the autombileVO through the service poller.  The vin is then used to search for specific service appointments and knowledge on its current status.

### Technicians
- GET - List of technicians are currently in the system. Use the request type "GET" and the following Url to get the full list.
    Url: "http://localhost:8080/api/technicians/"

Input Data: None needed

Response Data:
{
	"technicians": [
		{
			"first_name": "April",
			"last_name": "Hemingway",
			"employee_id": "ahemingway",
			"id": 3
		},...
    ]
}

- POST - Create an individual new technician in the system. To create a technician, you would input values into First_name, last_name, and employee_id under a "POST" request. Each technician will be automatically assigned an "id". This value will pinpoint the exact technician by placing the "id" at the end of the endpoint. For example, http://localhost:8080/api/technicians/5". Once submitted, the new technician should appear on the list of technicians.
    Url: "http://localhost:8080/api/technicians/<int:id>/"

Input Data:
{
	"first_name": "Luciano" ,
	"last_name": "Whitehurst",
	"employee_id": "lwhitehurst"
}

Response Data:
{
	"first_name": "Luciano",
	"last_name": "Whitehurst",
	"employee_id": "lwhitehurst",
	"id": 5
}

- DELETE - Delete a specific technician out of the system. Using the same id, change your request to "DELETE" and specify which technician you'd like to delete based on their "id". To confirm the deletion was complete, look in the list of technicians. If the name and/or id has disappeared, you've done it! You should recieve and message that also confirms the technician has been deleted.
    Url: "http://localhost:8080/api/technicians/:id/"
Input Data: None needed

Response Data: "message": "Technician Deleted!"

### Appointments

- GET - List of current active created appointments. Appointments are split into three categories: created, canceled, and finished. For a list of current created appointments, use the following link with a "GET" request.
    Url: "http://localhost:8080/api/appointments/"
Input Data: None needed

Response Data:
{
	"appointments": [
		{
			""date_time":"2024-12-15T22:51:00.000Z",
			"reason":"Oil Change",
			"vin":"19XCV1A1KA87630",
			"customer":"Jack Hill",
            "technician":"4",
		},...
    ]
}

- POST - Create an individual appointment to send to the active list. In a POST request, assign data to the vin, customer (first and last name), date_time (specified format), reason (reason for appointment), status (new appointments will automatically be set to "created"), and technician_id. The outcome should have all the same fields plus the appointment.
    Url: "http://localhost:8080/api/appointmnets/"
Input Data:
{
	"vin": "1HGCM82633A123456",
	"customer": "John Doe",
	"date_time": "2024-12-15T21:10:00.000Z",
	"reason": "Oil change",
	"status": "created",
	"technician_id": "5"
}

Response Data:
{
	"vin": "1HGCM82633A123456",
	"customer": "John Doe",
	"date_time": "2024-12-15T21:10:00.000Z",
	"reason": "Oil change",
	"status": "created",
	"technician_id": "5"
    "id": 1
}

- DELETE - Delete a specific appointment to send to the service history list. Using the id, change your request to "DELETE" and specify which appointment you'd like to delete based on their "id". To confirm the deletion was complete, look in the list of appointments. If the name and/or id has disappeared, you've done it!
    Url: "http://localhost:8080/api/appointments/:id/"
Input Data: None needed

Response Data: "message": "Appointment Deleted!"

- PUT - Set appointment status to "canceled" and sends to the service history list. If an appointment has been canceled, use the "id" of the specified appointment and place it within the following url. In a PUT request, this will change the status of the appointment to canceled and move the appointment from the list of appointments to the service history list. To verify, check the service history list.
    Url: "http://localhost:8080/api/appointments/:id/cancel/"
Input Data: None needed

Response Data: None

- PUT - Set appointment status to "finished" and sends to the service history list. If an appointment has been finished, use the "id" of the specified appointment and place it within the following url. In a PUT request, this will change the status of the appointment to finished and move the appointment from the list of appointments to the service history list. To verify, check the service history list.
    Url: "http://localhost:8080/api/appointments/:id/finish/"
Input Data: None needed

Response Data: None
