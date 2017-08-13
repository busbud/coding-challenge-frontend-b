import AppDispatcher from './AppDispatcher';
import async from 'async';
const _ = require('lodash');

class AppActions {
  fetchAll(from, to, when) { 
    this.dispatchIsLoading(true);
    // Cannot use 29 of july because date already past, so i am using a dynamic date choose by the user
    when = when.toISOString().slice(0,10);
    this.from = from;
    this.to = to;
    this.when = when;
    this.endpoint = `https://napi.busbud.com/x-departures/${from}/${to}/${when}`;

    fetch(this.endpoint, {
      headers: {
        'X-Busbud-token': 'PARTNER_JSWsVZQcS_KzxNRzGtIt1A',
        'Accept': 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/'
      }
    })
    .then((res) => res.json())
    .then((myJson) => { 
      const { cities, locations, operators, departures } = myJson;
      this.results = { cities, locations, operators, departures, travelDate: when };

      this.dispatchResults(this.results);

      if(!myJson.complete){
        this.complete = myJson.complete;
        // Store index in order to loop if call response is not complete
        this.index = myJson.departures.length;
        // Call loop to continue to fetch results
        this.fetchPartial();
      }else{
        this.dispatchIsLoading(false);
      }
    })
    .catch((err) => {
      console.error('Fetch API: An error occured');
      console.error(err);
    });
  }
  fetchPartial(){
    // Loop as long as response is not complete
    async.until(
       () => { return this.complete; },
       (cb) => {
        // Loop every x seconds (1 seconds for this test) to not overload the server
        setTimeout( () =>{
          const partialEndpoint = `${this.endpoint}/poll/?index=${this.index}`;
          fetch(partialEndpoint, {
            headers: {
              'X-Busbud-token': 'PARTNER_JSWsVZQcS_KzxNRzGtIt1A',
              'Accept': 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/'
            }
          })
          .then((res) => res.json())
          .then((myJson) => { console.log(myJson);
            const { operators, departures } = myJson;
            const { cities, locations, travelDate } = this.results;

            const refreshedOperators = _.unionBy( this.results.operators, operators, 'id');
            const refreshedDepartures = [...this.results.departures, ...departures];

            this.results = { 
              cities, 
              locations, 
              operators: refreshedOperators, 
              departures: refreshedDepartures,
              travelDate
            };

            this.complete = myJson.complete;

            if(!myJson.complete){
              // Update index for next partial call
              this.index += myJson.departures.length; 
              // Continue to loop
              cb();
            }else{
              this.dispatchIsLoading(false);
            }
            // Return results with partial results added
            this.dispatchResults(this.results);
          })
          .catch((err) => {
            console.error('Fetch API (Partial): An error occured');
            console.error(err);
          });
        }, 1000);
      },function (err) {
        console.error('ASYNC Fetch api partial: An error occured');
        console.error(err);
      }
    );
  }

  dispatchResults(data) {
    AppDispatcher.dispatch({
      actionType: 'POPULATE_RESULTS',
      results: data,
    });
    return null;
  }
  dispatchIsLoading(data) {
    AppDispatcher.dispatch({
      actionType: 'TOGGLE_LOADER',
      isLoading: data,
    });
    return null;
  }
}

export default new AppActions();
