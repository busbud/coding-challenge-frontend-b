import API from './api';

import { gotCities } from './cities';
import { gotDepartures, DEPARTURES_DATA, setComplete } from './departures';
import { gotLocations } from './locations';
import { gotOperators } from './operators';

const api = new API();

const dataService = store => next => action => {
  next(action);

  switch (action.type) {
    case DEPARTURES_DATA.GET:
    case DEPARTURES_DATA.POLL:
      let type = (action.type === DEPARTURES_DATA.POLL) ? 'poll' : 'get';
      let query = action.query;

      if (store.polling) {
        clearTimeout(store.polling);
      }

      if (type === 'poll') {
        let { departures } = store.getState();
        query.limit = Object.keys(departures.results).length;
      }

      api.departures(action.origin, action.destination, action.date, action.query)[type]().then(res => {
        if (res.status !== 200) {
          console.error(res);
          return next({
            type: DEPARTURES_DATA.ERROR,
            res
          });
        }

        return res.json();
      }).then(data => {
        Promise.all([
          next(gotCities(data.cities)),
          next(gotDepartures(data.departures, type)),
          next(gotLocations(data.locations)),
          next(gotOperators(data.operators)),
          next(setComplete(data.complete))
        ]).then(() => {
          if (data.complete === false) {
            store.polling = setTimeout(() => {
              store.dispatch({
                ...action,
                type: DEPARTURES_DATA.POLL
              });
            }, 2000);
          }
        });
      });
      break;
    default:
      break;
  }

};

export default dataService;
