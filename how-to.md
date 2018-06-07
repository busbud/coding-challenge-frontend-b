# How-to

## Requirements

- node 8.*
- [yarn](https://yarnpkg.com/)
- [heroku-cli](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up)

## Install

```bash
yarn install
```

Then Add an `.env` file from the boilerplate [.env.sample](.env.sample).

## Test

```bash
yarn test
```

## Run the app

```bash
yarn run start:dev
```

then open your favorite browser [http://localhost:8080/](http://localhost:8080/)

## Deployment

```bash
yarn run start
```

## Others

This cleans the build folder

```bash
yarn run clean
```

This runs the linter

```bash
yarn run lint

# with fix
yarn run lint:fix
```

This validate the codebase (lint + test)

```bash
yarn run validate
```
