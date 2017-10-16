import axios from 'axios';

export default function search() {
  return (dispatch) => {
    return axios.get('https://napi.busbud.com/x-departures/dr5reg/f25dvk/2018-08-02', 
    {
      'headers': {
        'Accept': 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
        'X-Busbud-Token': 'PARTNER_JSWsVZQcS_KzxNRzGtIt1A'
      }
    }).then(response => {
      console.log(response.data);
      // this.setState({displayResults: true});
      dispatch(getDepartures(response.data))
      console.log(this.state);
    }).catch((error) => {
      console.log(error);
      // this.setState({displayResults: false});
    });
  }
}

export function getDepartures(departures) {
  return ({
    // type: GET_DEPARTURES,
    // departures => {};
  })
}

