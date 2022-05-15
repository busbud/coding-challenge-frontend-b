<p align="center"><img src="https://cloud.githubusercontent.com/assets/1574577/12971188/13471bd0-d066-11e5-8729-f0ca5375752e.png" width="400px" /></p>

# Osheaga Festival Microsite - [Busbud Coding Challenge](https://github.com/busbud/coding-challenge-frontend-b)

> A ReactJS app for getting [Busbud](https://busbud.com) departures from **Quebec City** to **Montreal**, for the _Osheaga Festival Musique et Arts_.

**[Check out the Demo](https://busbud-osheaga-travel.herokuapp.com/)**

**Table of contents**

1. [Assumptions](#assumptions)
1. [Stack](#stack)
1. [Features](#features)
1. [Configuration](#configuration)
1. [Scripts](#scripts)
1. [Credits](#credits)

## Assumptions

-   The currency to be used is **CAD**.
-   The date is set to a date in the future (**2022-08-02**).
-   The departures are one-way only (**Quebec City to Montreal**).
-   The results received with each search (initial and polling) have matching depatures, cities, operators, and locations arrays, i.e., previous result data is not used when processing new polling results. 

## Stack

-   [ReactJS](https://reactjs.org/): Frontend library
-   [TailwindCSS](https://tailwindcss.com/): CSS framework
-   [daisyUI](https://daisyui.com/): UI library
-   [Heroicons](https://heroicons.com/): Icons
-   [react-i18next](https://react.i18next.com/): Internationalization framework

## Features

-   Onboarding screen that triggers the departure search.
-   Departure search (initial and polled) results for origin (Québec - geohash: f2m673) and destination (Montréal - geohash: f25dvk) for 2nd of August 2022 for 1-5 adults (capsize at 5 similar to Busbud).
-   Display of operator logo/name, departure time and location, destination time and location, trip duration, and price.
-   Select button that redirects to the Busbud website for the selected departure.
-   Language selector that changes the language of the app: English and French.
-   Fully responsive design that adapts to any screen size.

## Configuration
Create a `.env` file in the root directory with the following variables:

```bash
REACT_APP_BUSBUD_API=https://napi.busbud.com
REACT_APP_BUSBUD_TOKEN=<your-token>
```

## Scripts

```bash
# Install dependencies
npm i

# Start the development build
npm run start

# Install serve for the production build (1st time only)
npm i -g serve

# Start the production build
npm run build
serve -s build
```

## Credits
Loading indicator: [Baamboozle](https://www.baamboozle.com/)
Busbud logo: [Wikimedia](https://www.wikimedia.org/)