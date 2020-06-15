# Innoscripta Pizza

## Deployed on Azure Cloud
https://InnoScripta.azurewebsites.net/
## Database Azure Cloud server
innoscriptapizza-database-server.database.windows.net

## Technologies
* .NET Core 3.1
* Angular 10 RC
* HTML5, CSS3, Bootstrap
* Azure MS Sql Server
* Entity Framework Core 3.1
* AutoMapper
* Swagger for Open API
* Azure Cloud Hosting.


## Getting Started

1. Install the latest [.NET Core SDK](https://dotnet.microsoft.com/download)
2. Install the latest [Node.js LTS](https://nodejs.org/en/)
3. If you want to build the application, you might need visual studio 2019.

## Task Details
Let’s imagine you want to start a new pizza delivery business. Please create a small web application for online pizza
ordering. The idea is to make a non-existing service where assumed clients can choose a pizza, put it into a cart
and make an order.

### Requirements
1. The menu page should contain at least 8 pizzas - Status - Done
2. Login is not required but could be available for checking the history of orders.- Status - Done
3. Your clients should be able to choose pizzas directly from the menu- Status - Done
4. You can decide what else you want in the menu- Status - Done
5. Adding a description for each pizza would be a nice decision- Status - Done
6. Don’t proceed to the payment page. The last action from a client will be filling in the order form (address,
name, surname, etc.) to get a confirmation that the order has been received - Status - Done
7. A client should be able to put several pizzas into cart, and the quantity must be defined both while
outside the cart and in the cart - Status - Done
8. Total price of each order must be calculated and shown in euros and in dollars- Status - Done
9. Don’t forget to add delivery costs to the final bill- Status - Done

### Features.
1. Application is divided into two projects, one with apis & front end. another project contains the persistence layer. it has everything related to database, context, models, repositories etc.
2. Project build on Open API principles so you can have access to apis here https://innoscripta.azurewebsites.net/swagger
3. All the Rest API end points are built as asynchronous.
4. Followed SOLID priniciples whereever possible.
5. It has Logging, Mapper, Entity framework core, Fluent validation on models. 
6. Front end build using latest version of angular, followed angular style guideline while building the app, the design of the app is inspired from famous websites from this field and most of the comes from me.
7. In Front end I have used Angular 10, HTML5, CSS, bootstrap, Animation, Localstorage for cookies, animation for toaster, spinner icons for http opearations, live cart updates, floating order button on menu, tslint for analysis on typescript code, dependancy injection on services, shared models, GDPR enabled.    
