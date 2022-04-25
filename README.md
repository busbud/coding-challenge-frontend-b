# Micro app to search for bus trips for a fixed date, fixed locations

Deployed at:  https://busbud-challenge-baluk.herokuapp.com/

## Micro server to search for departures

API accepts params to configure locations, date and other options (though geohash codes are limited to Montreal and Quebec)

### Available Scripts for serveer

In the project directory, you can run:

#### `npm start`

Start the server in the development mode.

#### `npm test`
Launches the test runner in the interactive watch mode.

## Micro webapp to display UI to trigger search for bus trips for a fixed date, fixed locations

It does not have dynamic controls for selecting date, locations and other options.

I have opted to use Material-UI for easy responsiveness and accessibility

For production app, I would also set up css variables to be used with css-modules for the purposes of the app theme/color pallette

Would have also added Cypress.io integration testing on top for most critical scenarios

Support with multiple languages would have been implemented with `react-i18next`

### Available Scripts for webapp

In the webapp directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

#### `npm test`
Launches the test runner in the interactive watch mode.

#### `npm run build`
Runs production build
