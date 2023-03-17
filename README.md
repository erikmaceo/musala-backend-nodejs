# musala-backend-nodejs
Managing gateways 

Installation
Prerequisites: Install nodeJS, npm, MongoDB, MongoDB Compass, Postman rest client.

1. Clone project from this repository

2. To import database (from MongoDB Compass)
    - Make *New Connection* (**Hostname:** localhost, **Port:** 27017)
    - Do *Create Database* with name: gatewayDB (It is not necessary to fill in the Collection Name field)
    - Inside the database create 1 *collections* (gateways)
    - Within each collection, in the toolbar look for *Collection -> Import Data*
    - Import the .JSON file that is in the collections folder of this repository

3. Import the .JSON file from Postman rest client, that is in the postman folder of this repository to make the test. 

4. **Install dependencies:** In the console (go to the root of the project)
$ npm install

4. Run Project  

$ npm start

