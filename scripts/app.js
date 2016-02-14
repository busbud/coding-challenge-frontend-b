var Backbone = require('backbone');
var Router = require('./routes/Router');

// var initialize = function() {
//   var locale = 'en';
//   // Gets the language file.
//   $.getJSON('../locales' + locale + '.json', function(data) {
//     // Instantiates polyglot with phrases.
//     window.polyglot = new Polyglot({phrases: data});
//     // Pass in our Router module and call it's initialize function
//     // Router.initialize();
//     new Router();

//     Backbone.history.start();
//   });
// }
// return {
//   initialize: initialize
// };

new Router();
Backbone.history.start();