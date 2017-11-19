# coding-challenge-frontend-b solution documentation
![osheaga](https://cloud.githubusercontent.com/assets/1574577/12971188/13471bd0-d066-11e5-8729-f0ca5375752e.png)

It will be hot this summer in Montreal with the [Osheaga festival](http://www.osheaga.com/)! 
Your challenge is to build a microsite that allows a traveler from NYC to find one-way departure schedules for the festival's opening weekend.

## Architecture

This project consists in two main parts, a small server or middleware and a client.

### Server

Responsible of proxying the requests from the client and keeping the security up to date.

### Client

Responsible of the visual part of the project

## Deployment

>To run the server it is required to provide a Busbud API key in the server environment:

### Heroku:

Add the token to the `Settings->Config Variables`.

### Local:

```
BUSBUD_TOKEN="yourKey" npm run start-server
```

The server will be listening to the port `8080`. 

## Development

### Server

It is possible to set the server in development mode as follows:

```
ENV="DEV" npm run start-server
```

The server will be listening to the port `8080` and mock data will be serverd.

### Client

Execute:

```
npm run start-client
```

The application will be listening to the port `3000`.

## Available commands

### Install server dependencies

Install all the server dependencies

```
npm run install-server
```

### Install client dependencies

Install all the client dependencies

```
npm run install-client
```

### Install all dependencies

Install all the dependencies

```
npm run install-all
```

## CLIENT 

### TODO's

> NTH = Nice to have

...

### GTK

> Good to know's 

* Bootstrap : *UNMET PEER DEPENDENCY*: See [github issues](https://github.com/twbs/bootstrap/issues/24078#issuecomment-331860225). Since we are not using the JS we are going to ignore the warnings.

