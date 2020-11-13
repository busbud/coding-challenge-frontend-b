## Busbud Front-End Coding Challenge

Your challenge is to build a microsite that allows a traveler from Québec to find one-way departure schedules for the festival's opening weekend.

## result

https://quebec-to-osheaga.herokuapp.com/

## Project setup

For this project I'm using

- React (create-react-app)
- i18next: An internationalization-framework written in and for JavaScript
- Sass
- prop-types: Runtime type checking for React props and similar objects.
- moment: A JavaScript date library for parsing, validating, manipulating, and formatting dates.
- Axios: Promise based HTTP client for the browser and node.js

## Issues

- Api request responds an expiration date error for the asked date on 2nd of August 2020. In real world we need a date picker
  to define the date. For this challeng you can change date on "utils/constants.js" file for test.

- I added change language dropdown to my navbar, and with changing the date it will send new get request to backend if we already have data to display but
  It seems even with adding query parameter "lang=fr" the respons is still in English.
