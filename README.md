[![Build Status](https://travis-ci.org/nvnoskov/coding-challenge-frontend-b.svg?branch=master)](https://travis-ci.org/nvnoskov/coding-challenge-frontend-b)

# Busbud App

**The microsite is deployed [here](https://busbud-app.herokuapp.com).**

## Description
Autocomplete components with dummy fetching (always return New York, Montreal, Halifax) lets choose different combinations of this cities.

I added Halifax to test correct calculation of trip duration when origin and destination points are located in different timezones. (durations calculated by luxon library which weights 68kb, this is too large, and I definitely will find better solution on a production)

When search is initiated inner timer starts and repeats search request (with `/pool`) every 2 seconds until the response `complete:true` is recieved.



## Selected technologies
- React to build UI components
- React Contexts to work with data
- axios to perform api calls

## Dev process steps
1. Start with create-react-app as a boilerplate.
2. Dive into Busbud API
3. Write react components
4. Write some tests
5. HTML Markup and responsibility
6. Add basic A11y features



## Left todo
- Routing
- Error handling
- Fix DayPicker localization issue
- Add critical css to improve first meaningfull paint
- PWA

## Audit
![Audit](https://i.imgur.com/J2RtjXg.png)
