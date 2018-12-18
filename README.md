# For

# Tiny Travel Search (aka Coding Challenge Front B)

## Forwords

Work log : 3 days

Main libs :

- redux
- redux-saga
- moment
- lodash/fp
- Material UI
- ...

Tiny search was build with several constraints :

1. Ensure a high code coverage level (Unit test && TDD everytime is possible, use of snapshot testing to prevent ui breaks )
2. Make a smart use of redux based on event sourcing-like concept extended by redux-saga
3. Due to the exercice constraints, be more focus on the UX rather than the UI
4. Learn something new, here it was the first time with material UI

5. Use static typing (with flow) as much as possible

## Code Design

Currently I've started to read the Eric Evans' book "Domain Driven Design Tackling the complexity in the heart of software" and I found it very interesting. Even, if DDD is not really front-end dedicated and try to bring some concepts when developping JS application.

Here I tried to split my code between what belongs to the domain logic (reducers, sagas, ...) and what is only visual logic. The domain logic was also splitted into bounded countext. Here, the current domain is very little so I've got only one bounded context called search. This search context contains things like reducer, helpers, etc and only expose to the outside a very small API.

## UX/UI Consideration

For me, this app with one single purpose : allow a user to make a search. In this way, we don't need much decoration, or irrelavant details. A user should stay focus on what is supposed to do : make a search without any pain.

With Material UI, I've deciced to build a UI as light as possible

## Way of improvement

- Improve error handling in cas of server failure
- Add a nice theme to bring some colors
- Use react-router to keep search params in the url even if the page was refreshed
- split search component in more smaler components
- add flow type checking to sagas
- resize operator image
