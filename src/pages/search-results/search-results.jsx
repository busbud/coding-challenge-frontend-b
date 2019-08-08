import React, {Component} from 'react';

import CardList from '../../components/card-list/card-list.component';

const url = 'https://napi.busbud.com'
const origin = 'dr5reg'
const departure = 'f25dvk'
const outbound_date = '2019-08-12'
const adult = '1'
const child = '0'
const senior = '0'

class SearchResults extends Component {
  constructor() {
    super()
      this.state = {
        locations: [],
        departures: [],
        cities: [],
        dataIsComplete: false,
        currentIndex: 0
      }
  }
  
  componentDidMount() {
    this.search()
  }

  componentDidUpdate() {
    if(!this.state.dataIsComplete){
      setTimeout(() => {
        this.polling(this.state.currentIndex)
      }, 2000)
    }
  }

  polling = (index) => {
    fetch(`${url}/x-departures/${origin}/${departure}/${outbound_date}/poll?adult=${adult}&child=${child}&senior=${senior}&index=${index}`, {
      headers: {
      'Accept': 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
      'X-Busbud-Token': 'PARTNER_AHm3M6clSAOoyJg4KyCg7w'
    },
      'cache': 'default'
    })
    .then(response => response.json())
    .then(data => {
      this.setState({ 
        locations: this.state.locations.concat(data.locations),
        departures: this.state.departures.concat(data.departures), 
        cities: this.state.cities.concat(data.cities), 
        dataIsComplete: data.complete,
        currentIndex: this.state.currentIndex + data.departures.length
      })
    })
  }

  search = () => {
    const API_URL = `${url}/x-departures/${origin}/${departure}/${outbound_date}?adult=${adult}&child=${child}&senior=${senior}`;
    
    fetch(API_URL, {
      headers: {
        'Accept': 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
        'X-Busbud-Token': 'PARTNER_AHm3M6clSAOoyJg4KyCg7w'
      },
        'cache': 'default'
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ 
          locations: data.locations,
          departures: data.departures,
          cities: data.cities,
          dataIsComplete: data.complete,
          currentIndex: data.departures.length
        })
      })
  }
    
  render() {
    return(
      <div>
        <div>
          <CardList locations={this.state.locations} departures={this.state.departures} cities={this.state.cities}/>
        </div>
      </div>
    )
  }
}

export default SearchResults;
