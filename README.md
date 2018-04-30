# Osheaga

![a-screenshot-of-the-app-homepage](https://i.imgur.com/CFeqgrv.png)

A single page web app to help festival-goers get from New York to Montréal in time for Osheaga music festival.

## To use

Visit the site on Heroku [here](http://osheaga-alex-chalk.herokuapp.com/).

## To run locally

Assuming you have git and node installed, setup is simple:

```
export REACT_APP_X_TOKEN_API='your_secret_busbud_api_access_code'
git clone git@github.com:adc17/coding-challenge-frontend-b.git
cd coding-challenge-frontend-b
npm install
```

To boot the server: `npm start`.

To run tests: `npm test`.

If you continue to see the message "There was an error loading some of your results; please refresh the page and try again", double-check you have exported the env variable correctly.

If you have issues with the test runner, `brew install watchman` can resolve them.

## The App

##### Paradigm

I've adopted a functional approach to this challenge, as building the site primarily involved manipulating basic data structures returned by the API—a task most suited to the functional paradigm.

##### State

State is managed by redux, and asynchronous actions (i.e. api calls) are handled by redux-loop. 

Based on an initial spike, I decided that relying on vanilla react state would result in at least one reasonably large component that scheduled api calls and handled state updates. Using redux let me separate these concerns from my JSX and increase the modularity of my codebase. 

I chose redux-loop as a middle-ground between two other libraries—it was simpler than redux-saga, but resulted in purer and easier-to-test code than redux-thunk.

##### Tests

All reducers and generic functions (e.g. those found in the `utils` directory) are tested. Sometimes react components handle data in a way that is too specific to extract into a generic function—the `DeparturesList` container is a good example—and these components are also directly tested. 

##### Server

Since there was no need for server-side code, the app is deployed as a static site and is served by Nginx. 

### Core Dependencies:

* [React](https://github.com/facebook/react)
* [Redux](https://github.com/reactjs/redux)
* [Redux Loop](https://github.com/redux-loop/redux-loop)

### Linting and Testing:

* [Jest](https://github.com/facebook/jest)
* [Enzyme](https://github.com/airbnb/enzyme)
* [Eslint](https://github.com/eslint/eslint)


## Known Issues

There is no localization support. I'd have liked to add this but decided against it for a few reasons: it was specified as a bonus feature; I was running out of time and didn't want to rush the implementation; and I think the project already gives a good indication of my coding level.

The test runner sometimes crashes with errors concerning `FSEventStreamStart`. This appears related to Jest's file-watching, and although I have been able to resolve the issue by installing watchman with homebrew, or by simply cloning a fresh copy of the repository, I have not been able to locate the exact reason for the bug.