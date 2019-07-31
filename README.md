# Osheaga Planner

Osheaga Planner is a React Application that can display a list of one-way departure shedules for the Osheaga Festival.

It's currently live and can be accessed [here](https://powerful-ocean-56732.herokuapp.com).

### Architecture

The application was built using React & Redux with responsiveness, localization and accessibility in mind. It uses one main reducer to control departures - searching and polling from Busbud's API.
    
The main libraries used were:
 - [react-boostrap](https://react-bootstrap.github.io): an accessible front-end framework
 - [redux](https://redux.js.org)
 - [reselect](https://github.com/reduxjs/reselect) efficient selectors
 - [react-redux-i18n](https://github.com/artisavotins/react-redux-i18n) localization
 - [axios](https://github.com/axios/axios) API Calls
 - [react-infinite-scroller](https://github.com/CassetteRocks/react-infinite-scroller) infinite scrolling component
 - [aXe](https://chrome.google.com/webstore/detail/axe/lhdoppojpmngadmnindnejefpokejbdd) extension to test accessibility

Other highlights:
- Sass with SCSS syntax was used for styling
- Airbnb JavaScript code style was used
- Environment variables were use to store URLs and the API Token
- Selectors were used to ensure efficiency 

### Features

#### Error handling
All failed API requests will result in a custom toastr message.

#### Mobile friendly
The page is fully responsive.

#### Acessible
With accessibility in mind, the website was built using bootstrap, and verified using [aXe's chrome extension](https://chrome.google.com/webstore/detail/axe/lhdoppojpmngadmnindnejefpokejbdd).
