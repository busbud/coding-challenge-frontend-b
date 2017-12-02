import * as React from 'react';
import './schedule.scss';
import 'whatwg-fetch';


export class Schedule extends React.Component<any, any> {
  interval: any;
  constructor(props: any) {
    super(props);

    this.state = {
      departures: [],
      locations: [],
      complete: false
    };
  }

  componentDidMount() {
    this.getDeparturesLoop(0, false, 0);
  }



  /**
   * Retrieve the departure from an index
   */
  getDeparturesLoop(index: number, isPoll: boolean, delay: number) {
    const timer = setTimeout(() => {
      clearTimeout(timer);

      // Base URL of the api web service to retrieve the departures
      const url = 'https://napi.busbud.com/x-departures';
      // the origin city geohash (here it's New York)
      const origin = 'dr5reg';
      // the destination city geohash (here it's Montréal)
      const destination = 'f25dvk';
      // Challenge doc say to use an ISO 8601 data but an ISO 8601 seems to not correspond on what the server want
      const departureDate = '2018-09-22';//new Date(2018, 7, 2,10).toISOString();
      // Number of adult
      const adult = '1';
      // the display language   
      const lang = 'fr';
      // the currency to display
      const currency = 'USD';
      // the poll URL param
      const poll = isPoll ? '/poll' : '';
      // the index query string param
      const indexParam = isPoll ? `&index=${index}` : '';

      const requestURL = `${url}/${origin}/${destination}/${departureDate}${poll}?adult=${adult}&lang=${lang}&currency=${currency}${indexParam}`

      // send the request to the server to retrieve the possible departures
      fetch(requestURL,
        {
          method: "GET",
          headers: {
            "Accept": 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
            "X-Busbud-Token": 'PARTNER_JSWsVZQcS_KzxNRzGtIt1A'
          }
        })
        .then(response => response.json())
        .then(json => {
          console.log(json);
          // add the departure to the list of departure
          this.state.departures.push.apply(this.state.departures, json.departures);
          this.state.locations.push.apply(this.state.locations, json.locations);
          // check if the search is complete
          if (!json.complete) {
            this.getDeparturesLoop(this.state.departures.length, true, 3000);
          }

        }, error => {
          error.message //=> String
        });
    }, delay);
  }

  render() {
    let departuresList = this.state.departures.map(departure =>{
      return (
        <div>
          <div>
            {departure.departure_time}
          </div>
          <div>
            {departure.arrival_time}
          </div>
          <div>
            {this.state.locations.find(l => l.id === departure.origin_location_id).name}
          </div>
          <div>
            {this.state.locations.find(l => l.id === departure.destination_location_id).name}
          </div>
        </div>
      );
    });
    
    return (
      <div>
        {departuresList}
      </div>
    );
  }
}

