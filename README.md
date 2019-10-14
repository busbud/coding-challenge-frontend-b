# Osheaga App Challenge

This app utilizes the busbud API to search all departures for autust 2 2020 between new york and montreal.
The search can be triggered from the top navigaton bar.

## Data Flow

- Clicking on search initializes the FETCH_REQUEST action.
- Once a request is successful the complete parameter is set in Redux state generating a GET_DEPARTURES_SUCCEEDED event.
- Observer is subscribed to a GET_DEPARTURES_SUCCEEDED event and emits a POLL event if polling is not completed.
- Observer is subscribed to a POLL event and emits a FETCH_REQUEST with the appropriate index.
- This pattern is continued till polling is complete.
- Clicking on search again reinitializes this pipeline.

## Stack

- Utilized Create React App to bootstrap the basic layout for the app utilizing redux as the store.
- Reactive programming concept seemed the best way to design the polling mechanism
- Hence, for the middleware I ended up using redux-observable which is a wrapper around rxjs for react.
- Utilized material UI with JSS to generate responsive layouts. The app looks decent on screens of all sizes.

## [Heroku App][1]

[1]: https://dry-reef-35246.herokuapp.com
