var Backbone = require('backbone');

var HomeTemplate = require('../../templates/home.hbs');

var Home = Backbone.View.extend({
  el: '#app',

  template: HomeTemplate,

  initialize: function(data) {
    this.copy = data.copy;
    this.render();
  },

  render: function(copy) {
    this.$el.html(this.template({copy : this.copy }));
    return this;
  }
});

module.exports = Home;