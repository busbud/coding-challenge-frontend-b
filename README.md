Installation
------------

### You must update the URL variable in gulpfile.js
npm install

Deployment
----------

npm run production


Useful dev commands
-------------------

### Gulp watch
npm run watch

### Gulp build (it's like running one iteration of watch)
npm run build


Stack
-----

* Angular 1.6
* Foundation for Sites 6 (Sass + BEM)
* Express


Summary
-------

* You must create a .env file with your token inside;
* Then you can run node index.js;
* The heroku branch is used to deploy the app on Heroku;
* I use Heroku Config Variables to create my .env file on production;
* Use npm run production to minify the CSS and babel + uglify the JS;
* The app is responsive, there are three breakpoints: small, medium and large;
* The app has been tested with Browserstack on latest browers versions;
* IE8 and inferior will only see a message otherwise I've applied a graceful degradation to IE9 and higher;
* Images have been minified with https://tinypng.com/;
* I have used icomoon to import few Font Awesome icons.


Known issues
------------

* You must add the token manually while developing with npm run watch;
* I had to divide the prices.total by 100;
* The API call does not work on IE9, maybe because I use a promise?
