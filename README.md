# Osheaga Planner

Osheaga Planner is a React Application that can display a list of one-way departure shedules for the Osheaga Festival.

It's currently live and can be accessed [here](https://powerful-ocean-56732.herokuapp.com).

### Architecture

The application was built on top of react and redux. It uses one main reducer to control loading departures from BusBud's API; it includes filtering parsing.
    
Environment variables were use to store URLs and the API Token.

The main libraries used were:
 - [react-boostrap](https://react-bootstrap.github.io): an accessible front-end framework
 - [redux](https://redux.js.org)
 - [react-redux-i18n](https://github.com/artisavotins/react-redux-i18n) localization
 - [axios](https://github.com/axios/axios) API Calls
 - [react-infinite-scroller](https://github.com/CassetteRocks/react-infinite-scroller) infinite scrolling component
 - [aXe](https://chrome.google.com/webstore/detail/axe/lhdoppojpmngadmnindnejefpokejbdd) extension to test accessibility

Sass with SCSS syntax was used for styling.

Airbnb JavaScript code style was used.

### Features

#### Error handling
All API requests that comes with an error will result in a custom toastr message.

#### Mobile friendly
The page is fully responsive.

#### Acessible
With accessibility in mind, the website was built using bootstrap, and verified using [aXe's chrome extension](https://chrome.google.com/webstore/detail/axe/lhdoppojpmngadmnindnejefpokejbdd).

### Known Issues and Improvements

- After the user logs out, the access_token is removed, but the routine that refreshs the playlists keeps running, causing a "Session expired" alert.
