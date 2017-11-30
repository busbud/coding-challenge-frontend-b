import AppDispatcher from '../dispatchers/AppDispatcher';
import { EventEmitter } from 'events';
import assign from 'object-assign';

import api from '../utils/api';
import parser from '../utils/parser';

var CHANGE_EVENT = 'change';

var _index = 0;
var _departures = [];
var _complete = false;
var _error = '';

var DepartureStore = assign({}, EventEmitter.prototype, {
  
  getError: function() {
    return _error;
  },
  
  isComplete: function() {
    return _complete;
  },

  getDepartures: function() {
    return _departures;
  },


  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }


});

//TODO:Write validations to avoid the app crash.
AppDispatcher.register( function( payload ) {
    
    switch( payload.actionName ) {

        case 'initialSearchDepartures':
            api.initialSearchDepartures(payload.data).then(function(resp){
              _complete = resp.data.complete;
              _departures = parser(resp.data);
              _index = _departures.length;
              DepartureStore.emitChange();
            }).catch(function(err){
              //Printend errors in console, we could show it in the page also.
              console.error(err)
              DepartureStore.emitChange();
            });
                        
            break;

        case 'pollDepartures':
        
            api.pollDepartures(payload.data, _index).then(function(resp){
                _complete = resp.data.complete;
                _departures = _departures.concat(parser(resp.data));
                DepartureStore.emitChange();
            }).catch(function(err){
                //Printend errors in console, we could show it in the page also.
                console.error(err)
                DepartureStore.emitChange();
            });
                                
            break;
    }

});

export default DepartureStore;