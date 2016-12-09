var express = require('express');
var _departuresCtrl = require('./controllers/_departures-ctrl');

module.exports = function(app) {
  var apiRoutes = express.Router();

  apiRoutes.get('/departures', _departuresCtrl.departures)

  app.use('/api', apiRoutes);
}