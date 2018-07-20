# Busbud - Osheaga Coding Challenge

It is my first app with ReactJS, it was pretty cool and very instructive.

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

- Header, menu navigation and language switch (En, Fr)
- Page special travel to Oshega with pre-filled (and read-only) fields
- Free search page with town name autocomplete and date picker
- Multi-fechting data from Busbud server and add of them dynamicly in view
- Result presentation with link to operator (if available), link to Busbud plateforme for each journey, date display in case of an arrival on next day, ...
- Responsive design (space optimisation, from fields placement, operator name, action button, ...)

## Technical content

- SASS preprocessor
- Observable to manage responses on multi-fetching Busbud server
- React-Material component for reusage existing and improve the productivity
- React-translate-component to manage language changement and map dico

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

- Secure the partner token
- Create tests
- Add comments to methods and compenents minimaly
- Use Redux in stand of [React Router](https://github.com/ReactTraining/react-router)
- Use react-material color theme and factoring color in variable SASS

## Functional improvements

- Found and use a really React [Material](https://material.io/) date picker (or create one)
- Improve the dropdown autocomplete or use an existing one
- Improve user experience with the partial loading departures
