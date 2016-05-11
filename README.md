# Basic architecture
The application is split between a very basic server-side app, and a client-side app that contains most of the business logic.

### server
The server uses **Express** & **Handlebars** to provide a pre-rendered Single Page Application. It also handles i18n for this pre-rendered content.

### client
The client app uses **Relational-json**, **Handlebars** & **Moment** to create a simple request/render flow.
The **Search box** has been made read-only. Also, the request values are hard-coded into the request module, so changing search-box field values won't change the request made to the BusBud API.

## Getting started
The client-side application must be built, which can be done with: `grunt build`  
The client-side app is compiled using **Browserify**, and the styles are merged from **LESS** into a single css file.
The server-side application is ready for launch, no additional step are necessary. Just run: `node app`

## Heroku app
The app is hosted on Heroku at: https://damp-eyrie-20168.herokuapp.com/