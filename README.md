# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.



I was on an airplane when starting this, so I just used CRA with base scripts (As I had a global version already installed)
To avoid using an external library (Such as craco), I should have used [this library](https://www.npmjs.com/package/custom-react-scripts).

## Why I used X dependency:

**Typescript**: Everything should be types. All the time, always
**Reach Router**: Simple router with accesibility options
**Craco**: Aliases, to avoid ejecting app
**Material UI (MUI)**: To avoid thinking on design
**Emotion**: Came with MUI. You never know when you will ned some of its features
**Isomorphic Fetch**: Enabling to fetch in a cross-browser compliant fashion

# About the appplication:
- I fully realize that I could just put a button to say "search for tickets to Go to X festival" and leave it like that, BUT Searchers are more fun.
- Tests were not done because of lack of time. I know, lame excuse, but I usually wouldn't approve any merge like this one without coverage.
- Some decissions were made keeping in mind the scope of this. Since this was a fairly simple challenge, folder structure was kept simple across the project. 