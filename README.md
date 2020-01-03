Here is THE website you needed to consult all the trips from NYC to MTL, for you to come for the Osheaga Festival this Summer !

The website is deployed in **Heroku** and is available here : [https://dry-oasis-84825.herokuapp.com](https://dry-oasis-84825.herokuapp.com)

This documentation contains all the running instructions, choices and remaining improvements, but you can still [access the instructions here](https://github.com/busbud/coding-challenge-frontend-b).

# Run locally

In the project directory, you can run:

```
npm install

npm start
```

This will run the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Tests are available and can be launched via the following command

```
npm run test
```

# Technical choices

This project has been created having in mind that this should be a micro-website. The following sections cover the technical choices I made during its development.

## React

As part of the requirements, React was the Framework I chose to develop this application. I used the boilerplate `create-react-app` to start a project over.

This allowed me to quickly have a running application and quickly been able to create components to build the application.

The routing library I used is `reach router`. It is a very simple and lightweight library to have a navigation system in a react application.

## TypeScript

Having a typed-system language in the Front-End enforce the strengh of the application by ensuring the types we manipulate are those we actually declared, and thus prevent us from runtime errors.

That is why I chose to use TypeScript in this project, setting the `strict mode` to `true`. Having a ReasonML background, it was also the opportunity for me to know more about TypeScript development and philosophy.

I used TypeScript types for the components' `propTypes` and `state`. I also created several `interfaces` for deseralizing the API Response, that I map into another data structure that is easier and more efficient to use from the front-end perspective.

This mapping is done once the API response is received, and its shape is so that accessing data (like `operators`and `locations` information ) would be done in a complexity of `O(1)`.

## State management

As this is a single-page search micro-application, I chose to keep all the data management in component's state. The `SearchScreen` is the container - meaning the top level component that handles all the API calls and storing the results into its own state.

The hook `useReducer` allows the update of multiple state values at once (eg when receiving the data, `loading` should be stopped and data should be stored).

As the components hierarchy is not very deep, I also chose to send data though props instead of having a context or a global state manager.

## Testing library

Jest is included in React, providing the test structure and `expect` methods. When I wrote component's tests, I ensured that it displays the basic elements I need the user to see.

Using snapshot tests would have ensured the visual aspect of a component being rendered, but I followed another approach by using `react-testing-library`. Instead of having a snapshot of an entire component rendered, I check that the text that I feel is essential presence. In my case, this has the advantage of being less prone to changes (if the component's style changes, my test still pass).

Init and polling are covered in the `SearchScreen`tests. Are also covered the utilies methods, and what the search screen will display if it's loading, has error or has actual data.

## UI and Style

In order to have a nicer user interface, I chose one of the lightest UI library I know, which is `pure-css`. This library provides only a few components such as buttons.

To ensure a responsive and solid UI, I used `flexbox` in multiple places, and `css-grid` for the card that contain a trip information.

Component's style are managed by the css-in-js library `styled-components`. It allowed me to create components with isolated styling.

## I18N

Even if `Intl` is now accessible in JavaScript, I used `react-intl` to manage the application's translations. This library comes with a set of components that are very convenient when it comes to format text with values (with special tags, plural rules, etc.).

# Possible improvements

Like any project, possibilities of technical or functional improvements are endless - which could make the project to never end. Below stands a few points of improvements I though of.

## Add unit tests

I am missing tests for the data mapping (API to Front-end data structure).

## End-to-end Tests

This project contains unit and integration tests, which ensure that an isolated component of an association of a few components is working well. The next step would have been to create end to end tests (with Cypress for example), and create a very simple a quick scenario where the user could have accessed the site, navigated to the search screen, changed the language and selected an item.

## Functional improvements

The API returns a lot of fields that I did not exploited - such as the amenities. Those fields could have been mapped and displayed in the UI as well.

A sorting and filtering could also have been setup in order to make the search easier for the user.

## i18n - other languages

The only two languages that are handled are English and French. Other languages could have been integrated as well. In this case, the UI should have been reviewed as well, since all the flags are now displayed in the nav header (for example, rather display a modal containing the flags of all the supported laguages).
