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

* First of all you must create a .env file with your token inside;
* The heroku branch is used to deploy the app on Heroku;
* I use Heroku Config Variables to create my .env file on production;
* You need to run node index.js before starting your gulp watch;
* Use npm run production to minify the CSS and babel + uglify the JS;
* The app is responsive, there are three breakpoints: small, medium and large;
* The app has been tested with Browserstack on latest browers versions. 
* IE8 and inferior will only see a message otherwise I've applied a graceful degradation to IE9 and higher;
* Images have been minified with https://tinypng.com/;
* I have icomoon to import few Font Awesome icons.


Known issues
------------

* The querystring parameters seem to be ignored;
* The API call does not work on IE9, maybe because I use a promise?
* The currency is inccorect.

