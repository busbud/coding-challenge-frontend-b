#Osheaga

![a-screenshot-of-the-app-homepage](link)

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

To run tests: `npm test.`

## The App

I've adopted a functional approach as this challenge in

### Core Libraries:

* [React](https://github.com/facebook/react)
* [Redux](https://github.com/reactjs/redux)
* [Redux Loop](https://github.com/redux-loop/redux-loop)

### Linting and Testing:

* [Jest](https://github.com/facebook/jest)
* [Enzyme](https://github.com/airbnb/enzyme)
* [Eslint](https://github.com/eslint/eslint)



I used redux because a single call needed to update a lot of state, but it was a number of smaller components that were interested in the state.

Holding all the state in a single component and then passing it down seemed messy, unless i used redux which is for scenarios where centralized state is a good idea.



Things I could improve: Using a redux action to decide whether to poll the server seems a bit unintuitive and counter to redux convention.