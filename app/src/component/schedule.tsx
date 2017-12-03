import * as React from 'react';
import './schedule.css';
import 'whatwg-fetch';

/**
 * Component that display all the departure from the wanted location to the wanted destination at the asked date
 * Here all that property are hard coded for the challenge purpose
 */
export class Schedule extends React.Component<any, any> {
  interval: any;
  constructor(props: any) {
    super(props);

    this.state = {
      departures: [],
      locations: [],
      operators: [],
      complete: false
    };
  }

  /**
   * Launch the polling of get departure at the initialisation of the component
   */
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

      // the full request url with the query string parameter
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
          // add the departure to the list of departure        
          this.setState(
            {
              departures :  [...this.state.departures, ...json.departures],
              locations :  [...this.state.locations, ...json.locations],
              operators :  [...this.state.operators, ...json.operators]
            }
          );         
          // check if the search is complete
          if (!json.complete) {
            // if search is not complete we launch the getDeparturesLoop wih a 3 sec delay
            this.getDeparturesLoop(this.state.departures.length, true, 3000);
          }
          // set the complete state of the polling
          this.setState(
            {
              complete : json.complete
            }
          );
    
        }, error => {
          // error is not treated at the moment
        });
    }, delay);
  }

  /**
   *  render the loading element
   */
  loading(){
    if(!this.state.complete){
      return (
        <div key="loading">
            <i className="fa fa-spinner fa-spin" />
        </div>
      ); 
    }
    
    return('');    
  }

  /**
   * Render the departures list
   */
  departuresList(){
    return this.state.departures.map(departure =>{
      console.log(departure);
      return (
        <div key='{departure.id}' className='departure'>
          <div className='col-md-3 col-sm-3 col-xs-12 operator-logo'>
            <img src={this.state.operators.find(o => o.id === departure.operator_id).logo_url} />
          </div>
          <div className='col-md-6 col-sm-7 col-xs-12 departure-info-wrapper'>
            <div className='departure-info'>
              <span className='departure-time'>{new Date(departure.departure_time).toLocaleTimeString()}</span>
              <span>{this.state.locations.find(l => l.id === departure.origin_location_id).name}</span>
            </div>
            <div className='departure-info'>              
              <span>{new Date(departure.arrival_time).toLocaleTimeString()}</span>
              <span>{this.state.locations.find(l => l.id === departure.destination_location_id).name}</span>
            </div>                        
          </div>          
          <div className='col-md-3 col-sm-2 col-xs-12 departure-price-wrapper'>
            <div className='departure-price'>{ departure.prices.total/100} <sup>$</sup></div>
            <div>Per person</div>
          </div>
        </div>
      );
    });
  }
  
  /**
   * Render the list of departures received from server
   */
  render() {     
    console.log('im rendering');   
    return (
      <div key='departuresList' className="departures-wrapper">
        {this.departuresList()}
        <div key='loadingContainer'>
          {this.loading()}
        </div>
      </div>              
    );
  }

 
}



