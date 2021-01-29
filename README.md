## Introduction

This project uses Busbud API to search for Departures for a Specific event. This was part of the Hiring process. More information about the context you can look at 🔗[README-BUSBUD.md](./README-BUSBUD.md).

## Getting Started

### Requirements:

- NodeJS: 14.x.x
- Yarn
- Cypress

With this in mind, you first need to install the packages:

```sh
yarn
```

Everything installed successfully your rocket is ready to fly. 🚀

You have the development server:

```bash
npm run dev
# or
yarn dev
```

There are also the production version. For this version you need to build first:

```bash
yarn build && yarn start
```

To run locally you will need to setup a file `.env.local` in the project's root.

```sh
NEXT_PUBLIC_X_BUSBUD_TOKEN=<busbud_token>
```

Server up and running 🤘

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Features

This project had a limited scope. The features list isn't extense, but was implmented with 💙, ☕️ and 🎧

- ✅ International project: 🇧🇷 Portuguese, 🇫🇷 🇨🇦 French, 🇪🇸 Spanish, 🇺🇸 🇨🇦 English.
- ✅ Language Detection using Browser Headers.
- ✅ Language Selector, Currency Selector.
- ✅ Swith Places Button
- ✅ Suggestions for Origin and Destination, with pre-populated values
- ✅ Date Picker for easily select the outbound date
- ✅ Passengers select. Allowed up to 5 passengers, always minimum of 1. Children and Seniors Age selection are available too.
- ✅ Search with polling strategy. Every 3 seconds after the first incomplete. Passing the index to bring only new items.

## Development

It was developed using Typescript, and the usage of `any` is discouraged. Although, using third party libraries you can find some issues. The `any` must be your last resource, or at least it should 😂..

For style purposes, I've decided to mix one [Grommet](https://v2.grommet.io/), an UI Library, and [Styled Components](https://styled-components.com/).

The Global State Management was crafted using the traditional combo: Redux, React Redux, with a little bit of spicy with the `redux-toolkit`.

The decision to use this combo, instead of a `Context API` or simple `useState` in the components, was thinking in the scalability in case you need more data, more components and also a little bit more granularity.

## 🧪 Testing

- **Cypress** for Integration Test. The result for the search is a full mock of a response of the API.
- Unit testing was made using **Jest** and **React Testing Library**. Not all components was tested, but I tried to make a mix of styles: snapshots, testing the functionality or only if the component is rendered.

### 🧪 How to run the tests

In the [pacakge.json](package.json) file you can find some specific commands for both runners.
Cypress runner are configured to run in a Electron Browser. You can modify the config as you want/need.

For the integration tests, first you need to run the project server.
After this you can run the tests or open the Cypress suite.

The Unit tests are pretty straightforward. Just run the test command.

## Deploy

The project has a procfile and can be deployed in Heroku, Vercel or any other provider.
You only need to setup the environment variable with the Busbud Api Token:

```sh
NEXT_PUBLIC_X_BUSBUD_TOKEN=<busbud_token>
```
