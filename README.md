# coding-challenge-frontend-b
Using Express, Parcel, Preact, Pug, Sass & Bulma!

Project can be accessed here: https://busbud-osheaga-challenge.herokuapp.com

Use `yarn lint` to lint the `.js` files.

Use `yarn test` to run tests through [Cypress](https://github.com/cypress-io/cypress).

Use `yarn start` to run the code 🚀! Default URL for development is http://localhost:3000.
Thanks to [Parcel](https://github.com/parcel-bundler/parcel), we have auto file watching & hot module replacement while in development.
In production (meaning when `NODE_ENV=production`), everything gets minified and file watching & hot module replacement gets disabled.

[Preact-compat](https://github.com/developit/preact-compat) is set as an alias of React in `package.json` to have a smaller build size while still maintaining the same codebase.

Receives a 100/100 score on Performance, Accessibility and SEO from Lighthouse. 93/100 on Best Practices because Heroku doesn't serve the requests through HTTP/2.

Tested on Google Chrome, Firefox, Safari and Microsoft Edge.
