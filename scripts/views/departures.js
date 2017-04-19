var Backbone = require('backbone');

var DeparturesCollection = require('../collections/departures');
var DeparturesTemplate = require('../../templates/departures.hbs');

var Departures = Backbone.View.extend({
  el: '#app',

  template: DeparturesTemplate,


  initialize: function(data) {
    this.copy = data.copy;
    this.departures = new DeparturesCollection();

    this.listenTo(this.departures, 'sync', this.render);

    this.departures.fetch(
      {
        accepts: { json: "application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/" },
        data: { adult: 1, currency: 'USD', lang: 'en-US' }
      }
    );
  },

  render: function() {

    this.$el.html(this.template({
      departures: this.departures.toJSON(),
      copy: this.copy
    }));
    return this;
  }
});

module.exports = Departures;
