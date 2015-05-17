# Simple Webpack React Starter

## Motivation
I couldn't find a _simple_ webpack starter template that contained all the features I wanted.

I've put together this simple webpack starter example with the following features:

* Hot loading of react components
* Proxying onto your own api server (in `server/index.js`) for api calls
* Auto reload of api server on server file changes
* Sourcemaps during developement
* Sourcemaps for production builds for debugging deployed code
* Babel for js/jsx processing
* Imagemin for processing images
* Font handling
* scss/sass with autoprefixer
* Testing

## Getting started
Clone the repository:

```sh
git clone git@github.com:cgreening/simple-webpack-react-starter.git
cd webpack-starter
npm install
npm run dev
Browse to http://localhost:8080
```
If you just want to start a new project without all the commit history then do:

```sh
git clone --depth=1 git@github.com:cgreening/simple-webpack-react-starter <your-project-name>
cd <your-project-name>
npm install
npm run dev
Browse to http://localhost:8080
```
In `App` you'll find the single page reach app. Try opening `Components/Header.js' and modifying the text. Hit save and the browser should update with your changes.

In `Server` you'll find a minimal express server. Currently it serves content from the build directory and has 1 api call to get the current time.

Try adding a new api endpoint and modify `Components/Content.js` so that it hits your new endpoint.

You should be able to make all these changes without restarting the server manually as it should auto detect the changes and restart/reload as necessary.

## Running in Development Mode
```sh
npm run dev
```
This will start the webpack dev server on the defuault port (8080). It will also start the express server from `server/index.js` using nodemon.

Webpack dev server will watch for changes in the files from the `App` folder and hot load any changed modules.

nodemon will watch files in the `server` folder and restart the express server if any files change.

This means that you can update both your single page app and your backend during development and have the changes available immediately.

## Building for Production
```sh
npm run build
```
This will build the app and output the files to the `build` directory.
## Running the server
```sh
npm run server
```
This will launch the express server serving content from `build`

## Testing (Experimental)
Still experimenting in this area.

Base on [this guide](https://www.codementor.io/reactjs/tutorial/test-reactjs-components-karma-webpack) with a few tweaks.

Tests live in the `test` directory and use karma, mocha and sinon. Tests run in chrome.

```sh
npm run test
```
Does a test run.

```sh
npm run testing
```

Runs continuous tests.

## What could be done better

* duplicated code in the web pack config files

There is a lot of duplication between the two webpack config files - this is deliberate as I wanted it to be a as clear as possible what is happening. However it does mean that if you add a new loader you have to add it to both places.

* probably a lot of other things - open a pull request!

## Deploy to Heroku
Try out the code on heroku:

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)
