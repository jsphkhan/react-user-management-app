# Project Title

React User Management App

## Description
Simple User Management App created with React JS. Uses fake json-server data to create, update, delete and authenticate users. This repository has 3 foldders
* admin-app : The Admin Management App interface. Admin can create, view, update and delete users. This app was created using [create-react-app](https://github.com/facebook/create-react-app) starter kit
* user-app : The User App interface. User can only login and see his details. For simplicity of the demo, the actions are restircted. This app was created using [create-react-app](https://github.com/facebook/create-react-app) start kit.
* fake-server : fake json-server folder which has a db.json file. All related data are inside the json file. Read more about json-server [here](https://github.com/typicode/json-server).


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

* First Git clone the repo into your computer
```
git clone https://github.com/jsphkhan/react-user-management-app.git
```
The cloned repository/folder has 3 folders inside it as described above.

### Running the json-server
* First install the json-server (if you do not have it already) to create a REST interface. 
```
$ npm install -g json-server
```

### Running the Admin App
* Open your terminal
* cd into admin-app
* Run npm install to install all dependencies. Once done
* Run yarn start or npm start to start the webpack server.
* open (http://localhost:3000) in your browser. 
* This should open up the Admin App
* Use this account to login. (admin/admin@123)

### Running the User App
* Open your terminal
```
$ cd user-app
$ npm install
```
* This should install all the dependencies. Once done
* Run 
``` 
yarn start or npm start
```
* to start the webpack server.
* open (http://localhost:3001) in your browser. 
* This should open up the User App
* There are already few fake users created. You can login with one of them (john/yahoo@123)
* You can create more users from the Admin App and then login inside the User App.

### Prerequisites

NodeJS v6.10.3 and up, NPM

```
Install Node JS from [NodeJs download page](https://nodejs.org/en/download/)
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

Please read [CONTRIBUTING.md](https://github.com/jsphkhan/react-user-management-app/blob/master/Contributing.md) for details on the process of submitting a pull request.

## Known Issues/Limitations

* A proper authentication and authorization process is 
json-server is a fake REST API server and as such its functionalities are limited.

## Authors

* **Joseph Khan** - (https://github.com/jsphkhan)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
