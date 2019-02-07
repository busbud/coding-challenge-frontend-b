import React, { Component } from 'react';
import './App.scss';
import Results from './Results.jsx'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      buttonText: 'Search',
      departure: '',
      destination: '',
      fromGeo: '',
      toGeo: '',
      travelDate: '',
      departures: [],
      locations: []
    };
  }
  componentDidMount() {}


  getResults = url => {
    const myHeaders = new Headers();
    myHeaders.append('Accept', 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/');
    myHeaders.append('X-Busbud-Token', 'PARTNER_AHm3M6clSAOoyJg4KyCg7w');

    fetch(url, {
      method: 'GET',
      headers: myHeaders,
    })
    .then(data => data.json())
    .then(json => {
      this.setState({
        departures: json.departures,
        locations: json.locations
      })
    });

  }

  createQuery = () => {
    let fromCity = this.state.fromGeo;
    let toCity = this.state.toGeo;
    let tDate = this.state.travelDate;
    const apiURL = `https://napi.busbud.com/x-departures/${fromCity}/${toCity}/${tDate}/poll`
    this.getResults(apiURL)

  }

  getFromGeo = query => {
    let apiLink = 'https://napi.busbud.com/search?q='
    let qText = query.split(' ').join('+');
    let apiUrl = apiLink + qText + '&limit=5&lang=en&locale=en'

    fetch(apiUrl)
      .then(d => d.json())
      .then (json => {
        this.setState({ fromGeo: json[0].geohash });
      })
      .catch(error => console.log(error));
  }


  getToGeo = query => {
    let apiLink = 'https://napi.busbud.com/search?q='
    let qText = query.split(' ').join('+');
    let apiUrl = apiLink + qText + '&limit=5&lang=en&locale=en'
    fetch(apiUrl)
      .then(d => d.json())
      .then (json => {
        this.setState({ toGeo: json[0].geohash });
      })
      .catch(error => console.log(error));
  }


  handleSubmit = e => {
    e.preventDefault();
    if (!this.state.departure){
      alert('Please add a departure city for your search.')
      return;
    } else if (!this.state.destination){
      alert('Please add a destination city for your search.')
      return;
    }
    this.createQuery();
    this.setState({ buttonText: 'Update'})
  }

  render() {

    return (
      <div className="App">
        <header>
          <img src="https://busbud.imgix.net/busbud-logos/busbud_logo.svg?auto=compress%2Cformat" alt="logo" />
        </header>
        <div>
          <div className="searchSection">
            <div className="introHeader">
              <h1 className="introText">Book your bus ticket to </h1>
              <img src="https://cloud.githubusercontent.com/assets/1574577/12971188/13471bd0-d066-11e5-8729-f0ca5375752e.png" alt="Osheaga Logo" className="OsheagaPic"/>
            </div>
          <div className="searchArea">
              <form onSubmit={this.handleSubmit}>
                <label>From:
                  <input type="text" name="departure" value={this.state.departure} placeholder="New York City, NY" onChange={e => this.setState({ departure: e.target.value, fromGeo: this.getFromGeo(e.target.value) })}/>
                </label>
                <label>To:
                  <input type="text" name="destination" value={this.state.destination} placeholder="Montreal, QC" onChange={e => this.setState({ destination: e.target.value, toGeo: this.getToGeo(e.target.value) })}/>
                </label>
                <label>Date:
                  <input type="date" name="travelDate" min="2019-08-01" onChange={e => this.setState({ travelDate: e.target.value })}/>
                </label>
                <input className="searchButton" type="submit" value={this.state.buttonText} />
                </form>
          </div>
        </div>
          <div>
              <Results
                departures={this.state.departures}
                locations={this.state.locations}
                travelDate={this.state.travelDate}
                destination={this.state.destination}
                />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
