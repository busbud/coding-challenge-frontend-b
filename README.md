# coding-challenge-frontend-b
![osheaga](https://cloud.githubusercontent.com/assets/1574577/12971188/13471bd0-d066-11e5-8729-f0ca5375752e.png)

<!-- MarkdownTOC -->

- [Solution](#solution)
- [Deployment](#deployment)
- [Future](#future)
- [Notes](#notes)
- [Third party libraries](#third-party-libraries)
- [Credits](#credits)

<!-- /MarkdownTOC -->


## Solution

For this challenge I've created a react microsite served from an ExpressJS server.

### Server

Responsible for:

* Serving the client files
* Routing between the web-app and the API
* Enritcthing the API calls with the API token.

> **Note**: The server expects to have accessible an ENV var called `BUSBUD_TOKEN` containing the access token to the BusBud API.  

### Client

Responsible for:

* User interaction
* Data fething
* Data rendering
* Show the information according to the device used to visit the page (Responsive styles) 

## Deployment

The solution is ready to be deployed to a Heroku server.

IMPORTANT: Remember to add the ENV var to the `Settings->Config Variables` space in the heroku server.

To know how to interact with the app please see [docs.md](docs.md)

### Future

Some great enhancements can be easily done to enable the following use cases:

#### Event customisation
 
Improving the build and run scripts it is possible to load a different "branding" of the app. Enabling in this way to personalise the product a different event. In this way it is possible to offer this page as a service.
 
#### i18n

Adding internationalisation is a very simple step that fell off the current implementation due to time constrains but it can be easily achieved.

#### Widget usage

Because this app is standalone and uses redux for the state management, it is possible to be used inside another websites or systems. 
In this way it will be possible to enable Busbud partners to offer pre-configured trip results in their own systems.

> This three enhancements together would make possible to offer this product as a service.

## Notes

### Design

As design is a very important part of the presentation and high quality can't be achieved without the pertinent effort. Simplicity is what is being used.
The app code is meant to provide a fast evolution and enhancement of the styles. 

The app is responsive thanks to the usage of the Bootstrap framework.

### TODO's & FIXME's

Some Todo's and Fixme's can be found in the code around. Most of them are NTH or low priority issues of the current implementation.

### Demo

You can find a running demo [here](https://immense-temple-81195.herokuapp.com/)

## Third party libraries

### Client

* bootstrap
* cross-fetch
* moment
* react
* react-autosuggest
* react-dom
* react-redux
* react-scripts
* redux
* redux-logger
* redux-thunk

### Server

* express
* request

## Credits

* Edmon Marine Clota - 2017