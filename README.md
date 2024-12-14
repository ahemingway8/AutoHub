# CarCar

CarCar is an application that manages the inventory, sales of automobiles, and automobile services for an  an automobile dealership.

Team:

* April Hemingway - Sales
* Luciano Whitehurst - Appointments


## Running CarCar

1. Fork the repository:
    https://gitlab.com/Eric.Whitehurst/project-beta.git


2. Clone the forked repository:
   - git clone <<https://gitlab.com/Eric.Whitehurst/project-beta.git>>


3. Build docker containers and run them:
    - docker volume create beta-data
    - docker-compose build
    - docker-compose up

4. Make sure all of the containers are running

5. Project can be viewed in the browser at: http://localhost:5173\

### Description:
- There is an inventory of all the cars. We are polling information from the inventory domain to our sales microservice and service microservice to store past sales and service histroy. As well as update the information when prompted by a request.


## Design




##

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
    - Takes in the id of an individual manufacturer
    -URL: http://localhost:8100/api/manufactuers/id/


- DELETE: Delete a manufacturer
    - Takes in the id of an individual manufacturer and deletes it
    -URL: http://localhost:8100/api/manufactuers/id/
-
### Vehicle Model
- GET: List Vehicle Models
    - URL: http://localhost:8100/api/models/
- POST: Create a vehicle model
    - URL: http://localhost:8100/api/models/
- GET: Get details of a vehicle model
    - URL: http://localhost:8100/api/models/id/
- DELETE: Delete a vehicle model
    -URL: http://localhost:8100/api/models/id/

### Automobile




###





## Service microservice

Explain your models and integration with the inventory
microservice, here.

## Sales microservice

Explain your models and integration with the inventory
microservice, here.
