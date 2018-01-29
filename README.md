# coding-challenge-frontend-b
[![Build Status](https://travis-ci.org/BuonOmo/coding-challenge-frontend-b.svg?branch=master)](https://travis-ci.org/BuonOmo/coding-challenge-frontend-b)
[![Coverage Status](https://coveralls.io/repos/github/BuonOmo/coding-challenge-frontend-b/badge.svg?branch=master)](https://coveralls.io/github/BuonOmo/coding-challenge-frontend-b?branch=master)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![dependencies Status](https://david-dm.org/buonomo/coding-challenge-frontend-b/status.svg)](https://david-dm.org/buonomo/coding-challenge-frontend-b)

![osheaga](https://cloud.githubusercontent.com/assets/1574577/12971188/13471bd0-d066-11e5-8729-f0ca5375752e.png)

It will be hot this summer in Montreal with the [Osheaga festival](http://www.osheaga.com/)!

## Installation

To run this on your own computer, you need a token for busbud API, which you have to add to your env:

    export REACT_APP_BUSBUD_TOKEN=XXXXXXXX

You can also add a `.env` file to your root project, just be sure not to push it.

Afterward, simply run `npm install` and you are ready to go. You can start the dev server using `npm start`, or build one for production using `npm build`

## Tests

There are a few lint and unit tests that you can run with `npm test`. If you want to see coverage, run `npm run coverage`.

## Note on Redux

Redux was not needed in such a simple project (see [_You Might Not Need Redux_](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367)).
However, its implementation is interesting and might be necessary for the eventual next steps of this application.
In order to use best practices, its implementation is similar than the one you can find in Redux documentation [Async](https://github.com/reactjs/redux/tree/master/examples/async) example.
