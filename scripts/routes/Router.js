var $ = require('jquery');
var Backbone = require('backbone');

var HomeView       = require('../views/home');
var DeparturesView = require('../views/departures');

var Router = Backbone.Router.extend({
  getUserLocale: function() {
    return window.navigator.language.slice(0,2) || 'en';
  },

  loadCopy: function(lang) {
    return $.ajax( { url: '../../locales/'+lang+'.json' });
  },

  routes: {
    '' : 'home',
    'departures' : 'departures'
  },

  home: function() {
    var promise = this.loadCopy(this.getUserLocale());

    promise.success(function (data) {
      this.view = new HomeView({copy: data});
    });
  },

  departures: function() {
    var promise = this.loadCopy(this.getUserLocale());

    promise.success(function (data) {
      this.view = new DeparturesView({copy: data});
    });
  }
});

module.exports = Router;