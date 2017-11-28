import AppDispatcher from '../dispatchers/AppDispatcher';

var DepartureAction = {

  initialSearchDepartures : function(data) {
      AppDispatcher.dispatch({
        actionName: 'initialSearchDepartures',
        data: data
      });
  },

  pollDepartures : function(data) {
    AppDispatcher.dispatch({
      actionName: 'pollDepartures',
      data: data
    });
  }


}

export default DepartureAction;