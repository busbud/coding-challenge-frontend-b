## Project Name & Pitch

An application used to show  bus departures that is built with React, Redux, Typescript, and Webpack.

## Project Status

Completed

## Installation and Setup Instructions

Installation:

`npm install`  

To Start Server:

`npm start`  

To Visit App:

`localhost:8080`  

## What is used

  - Components: React Hook
  - Design: Antd
  - Bundling: Webpack
  - State management: Redux
  - Api Requests: Redux Saga,  axios
  - Language: Typescript
  - Styling: Sass modules

## Example:  

I have completed all requested things except bonus parts. I have done fetching for bus departures and showed in a table. Also, I added stops for each departure.
Whenever I have done requested, if the complete property of the response is I have started a setInterval with the eventChannel function redux saga and every 3 seconds, I have requested another fetch request until the complete property of the response is true. Here i have added the new departures directly to the state and showed them in the page. It was the most challenging part for me. Since i was using redux saga for the api requests, It was not easy as i expected.