# Project Title

React User Management App

## Description
Simple User Management App created with React JS. Uses fake json-server data to create, update, delete and authenticate users. This repository has 3 foldders
* admin-app : The Admin Management App interface. Admin can create, view, update and delete users. This app was created using create-react-app
* user-app : The User App interface. User can only login and see his details. For simplicity of the demo, the actions are restircted. This app was created using create-react-app.
* fake-server : fake json-server folder which has a db.json file. All related data are inside the json file. Read more about json-server [here](https://github.com/typicode/json-server).


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

* First Git clone the repo 

### Running the Admin App
* Open your terminal
* cd admin-app
* Run this command: npm install
* This will install all the dependent modules
* yarn start
* open (http://localhost:3000) in your browser. 
* This should open up the Admin App
* Use this account to login. (admin/admin@123)

### Running the User App
* Open your terminal
* cd user-app
* Run this command: npm install
* This will install all the dependent modules
* yarn start
* open (http://localhost:3000) in your browser. 
* This should open up the Admin App
* Use this account to login. (admin/admin@123)

### Prerequisites

NodeJS v6.10.3 and up, NPM

```
Install Node JS from https://nodejs.org/en/download/
```

### Installing

A step by step series of examples that tell you how to get a development env running

Say what the step will be

```
Give the example
```

And repeat

```
until finished
```

End with an example of getting some data out of the system or using it for a little demo

## Running the tests
-- Open for improvement --

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Known Issues/Limitations

* A proper authentication and authorization process is 
json-server is a fake REST API server and as such its functionalities are limited.

## Authors

* **Joseph Khan** - (https://github.com/jsphkhan)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
