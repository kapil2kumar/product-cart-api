# REST APIs for e-commerce system

## Data
Example of a product data JSON object:
```
{
    "product_id": 1,
    "product_name": "Nikon D850",
    "product_description": "The Nikon D850 sets remarkable standards of quality in both, possessing an impressive 45.7 effective megapixels that allows it to capture the most awe-inspiring images and produce phenomenal 8K UHD time-lapse movies via images taken with its silent interval timer shooting.",
    "product_price": "27195.10",
    "product_make": 2020,
    "product_created_on": 1619165988
}
```
Default User:
```
{
    user_email:"kapilboon2012@gmail.com",
    user_password:"Test@1234"
},
{
    user_email:"testuser1@yopmail.com",
    user_password:"Test@1234"
}
```

## Project Specifications
we are building REST APIs for e-commerce system for your local camera store where people can come and buy cameras.
Camera store has various products. User can add product into cart. Also to use the system user must login into the system.

The REST service must expose the `/users` and `/products` endpoint, which allows for managing the collection of users and products records in the following way:

**POST** request to `/users/login`:

- Login into the system
- the response code is 200, and the response body is user JWT token

**GET** request to `/products`:

- returns a collection of all products
- JWT token required in request header
- the response code is 200, and the response body is an array of all products objects ordered by their ids in increasing order

**POST** request to `/products/cart/add`:

- add products to cart for user
- JWT token required in request header
- if the matching products exists, the response code is 200
- if there is no products with the given id in the collection, the response code is 404 with the body having the text `ID not found`

**GET** request to `/products/cart`:

- get cart for a specific user
- JWT token required in request header
- the response code is 200, and the response body is an array of all products objects exist in user cart


## Environment 
- Node Version: ^12.18.2
- Default Port: 8000

## Running project
- You need to have installed Node.js and MySQL on your local machine.

**Read Only Files**
- `test/*`
- `/config/dbConfig.json` Default database connection with MySQL
```
{
    "username": "root",
    "password": "",
    "database": "node-app",
    "host": "127.0.0.1",
    "port":"3306",
    "dialect": "mysql"
}
```

**Commands**
- install: 
```bash
npm install
```
- run: 
```bash
npm start
```
- test: 
```bash
npm test
```

**Application Running**
- `http://localhost:8000`
- `Swagger: http://localhost:8000/api-docs`

## NPM Module
1. express and express -- Create application
2. express-swagger-generator -- API Documentation
3. morgan and winston -- for logging
4. jsonwebtoken --JWT token
5. sequelize and mysql2 --Database
6. chai and chai-http --test the application