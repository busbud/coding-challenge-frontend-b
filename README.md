# Busbud Front-End Coding Challenge

https://luanorlandi-osheaga.herokuapp.com/

The home page hits the Busbud API with the parameters:

- origin: f2m673
- destination: f25dvk
- outbound_date: 2021-09-03
- adults: 1

To change them, the following route should work similarly to https://www.busbud.com/ :

https://luanorlandi-osheaga.herokuapp.com/f2m673/f25dvk?outbound_date=2021-09-03&adults=1

## Development

Setup the environment variables in `env.local` (there is a template in `.env.example`) and run:

```bash
npm i
npm run dev
```

For running a production build:

```bash
npm run build
npm start 3000
```

## Test

For Jest tests:

```bash
npm run test:watch
```

For Cypress tests, add environment variable `NEXT_PUBLIC_API_MOCKING=true` (see section below about msw) and run:

```bash
npm run build
npm start 3000
npm run cypress:open
```

### MSW

When running with environment variable `NEXT_PUBLIC_API_MOCKING=true`, the [msw](https://github.com/mswjs/msw) runs a [service worker](https://developers.google.com/web/fundamentals/primers/service-workers) to intercept the requests with the handlers found in `mocks/handlers.js`

This is useful for tests (and was very useful for working around the Busbud API polling and cache).

## Deploy

Merge a branch to `main`, the CI/CD should handle the rest.
