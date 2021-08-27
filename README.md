# Busbud Front-End Coding Challenge

https://luanorlandi-osheaga.herokuapp.com/

## Development

Setup the environment variables in `env.local` (there is a template in `.env.example`)

```bash
npm i
npm run dev
```

For running a production build:

```bash
npm i
npm run build
npm start 3000
```

### MSW

When running with environment variable `NEXT_PUBLIC_API_MOCKING=true` the [msw](https://github.com/mswjs/msw) runs a [service worker](https://developers.google.com/web/fundamentals/primers/service-workers) to intercept the requests with the handlers found in `mocks/handlers.js`

This is useful for tests (and was very useful for working around the Busbud API polling and cache).

## Deploy

Merge a branch to `main`, the CI/CD should handle the rest.
