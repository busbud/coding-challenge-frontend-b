# Busbud Front-End Coding Challenge

## Command list:

`npm run start` starts in dev mode, browse in localhost:4200

`npm run test` runs all the unit tests

`npm run build` builds the app, outputs to /dist/busbud

## Interface and usage
First of all, if the interface is not intuitive by itself then my aim has failed, PERIOD.

That being said, there are some details that may be pointed out.

- Browser language detection: The app automatically detects the browser languages and picks the first that is supported (supported languages are english, french and spanish).

- Passenger selection: Adding children and seniors is allowed, but their ages are defaulted to 5 and 65 respectively.

- Je ne parle pas français: All french translations are done by Google translator, please do not take into acount any possible mistake.

## Technical decisions
The application has been done in Angular mainly because it is allowed for the test, and it is the framework I am more confortable with. The file/folder structure follows the Angular standard (using the CLI).

I have chosen to use also Bootstrap styles because they are a great way to achieve decent UIs in short times, some of the components use directives from Angular Bootstrap also (dropdowns & calendar) for the same reason. Developing this components by myself is feasible but would have taken more time than available.

The translation directive is an exception to the previous rule, because it has been developed from scratch instead of importing a full library or using default Angular i18n, the reasons for doing so are the following:
  - Angular default i18n solutions involves generating different builds (one per language), I wanted live updates without reload.
  - The existing libraries with similar functionalities include much other options, hence this is more lightweight.
  - It was fun as hell to develop it.

Regarding testing, I have included unit tests for almost all of the components/services, the missing ones and the e2e have not been done mainly by lack of time, sorry for that.

## Final notes
No matter the outcome of this test, I must say that it has been a good experience and a great oportunity to do what I love, developing javascript applications, learning a few new tricks along the way.
But, above all, it was FUN and I thank you for the experience.
