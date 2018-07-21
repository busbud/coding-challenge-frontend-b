# Busbud - Osheaga Coding Challenge

It is my first app with ReactJS, it was pretty cool and very instructive even if the philosophy is completely different from Angular. I learnt a lot of things and I liked the easiness of the components implementation.
Unfortunately I had not the time to tend over the unit test. It would have been my next step if I had extra time.

| Desktop                                                                                   | Mobile                                                                                 |
| ----------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| ![Desktop screenshot](readme_assets/screenshot_desktop.png?raw=true "Desktop screenshot") | ![Mobile screenshot](readme_assets/screenshot_mobile.png?raw=true "Mobile screenshot") |

## Demo

The site is deployed on Heroku : [travel-to-oshega-challenge](https://travel-to-oshega-challenge.herokuapp.com/).

## Local run

Based on [RCA](https://github.com/facebook/create-react-app), the use is very easy.

### Requirement

- nodejs v10.5.0 or more
- (optional) yarn v1.7.0 or more

### Installation

```
git clone git@github.com:antechg/coding-challenge-frontend-b.git
cd coding-challenge-frontend-b
yarn install
```

### Run (development mode)

```
yarn start
```

## Functional content

- Header, menu navigation and language switching (En, Fr)
- Special page Travel to Oshega with pre-filled (and read-only) fields
- Free entries search page with autocomplete city names and date picker
- Multi-fechting data from Busbud server with a dynamic addition in the view
- List of search results with links to operators (if available), direct links to Busbud plateform for each journey, date display in case of an arrival on the next day, ...
- Responsive design (space view optimization, form fields placement, operator names, action buttons, ...)

## Technical content

- SASS preprocessor
- Observable to manage responses on multi-fetching Busbud server
- React-Material component to improve productivity
- React-translate-component to manage language switching

### Dev Dependencies

- [React](https://github.com/facebook/react)
- [Axios](https://github.com/axios/axios)
- [React Router](https://github.com/ReactTraining/react-router)
- [React Moment](https://github.com/headzoo/react-moment)
- [RxJS](https://github.com/ReactiveX/rxjs)
- [React Translate Component](https://github.com/martinandert/react-translate-component)
- [Node Sass Chokidar](https://github.com/michaelwayman/node-sass-chokidar)

### Dev Dependencies

- [Prettier](https://github.com/prettier/prettier)

## Technical improvements

- Securing the partner token
- Creating unit tests
- Adding comments to methods and compenents at least
- Using Redux in stand of [React Router](https://github.com/ReactTraining/react-router)
- Using react-material color theme and factoring color in variable SASS

## Functional improvements

- Creating and using a better React [Material](https://material.io/) date picker
- Improving the dropdown autocomplete or using an existing one
- Improving the user experience with the partial loading departures
