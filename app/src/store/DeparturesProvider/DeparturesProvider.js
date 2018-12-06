import React, { Component, createContext } from "react";


import { serialize } from "./../../utils/serialize";


export const DeparturesContext = createContext();

class DeparturesProvider extends Component {
  constructor(props) {
    super();
    this.state = {
      complete: false,
      departures: [],
      isLoading: false,
      error: null,
      index: 0
    };

    this.urlParams = {
      origin: "dr5reg",
      destination: "f25dvk",
      outbound_date: "2019-02-20"
    };

    this.searchParams = {
      adult: 1,
      child: 0,
      senior: 0,
      lang: "fr",
      currency: "EUR",
    };
  }

  async fetchDepartures(urlParams, searchParams, index = 0) {
    const searchParamsSerialize = serialize(searchParams);
    const url = `https://napi.busbud.com/x-departures/${urlParams.origin}/${urlParams.destination}/${urlParams.outbound_date}/poll?${searchParamsSerialize}&index=${index}`
    const init = {
      method: 'GET',
      headers: new Headers(
        {
          "Accept": "application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/",
          "X-Busbud-Token": "PARTNER_AHm3M6clSAOoyJg4KyCg7w"
        }
      ),
      mode: 'cors',
      cache: 'default'
    }


    const fetchResponse = await fetch(url, init)
    const responseObject = await fetchResponse.json()
    if (!responseObject.complete) {
      const departures = this.state.departures.concat(responseObject.departures);
      this.setState({
        complete: false,
        isLoading: true,
        departures,
      })
      console.log('not complete', responseObject, this.state.departures);
      setTimeout(() => this.fetchDepartures(urlParams, searchParams, responseObject.departures.length), 1000)
    } else {
      //this.fetchDepartures(urlParams, searchParams, responseObject.departures.length)
      const urlComplete = `https://napi.busbud.com/x-departures/${urlParams.origin}/${urlParams.destination}/${urlParams.outbound_date}?${searchParamsSerialize}`
      const fetchCompleteResponse = await fetch(urlComplete, init)
      const CompleteResponseObject = await fetchCompleteResponse.json()

      this.setState({
        complete: true,
        isLoading: false,
        departures: CompleteResponseObject.departures,
      })

      console.log('complete', CompleteResponseObject, this.state.departures);

    }
    console.log(this.state);
  }

  componentDidMount() {
    this.fetchDepartures(this.urlParams, this.searchParams, 0);

  }

  render() {
    const { departures, isLoading, error } = this.state;
    return (
      <DeparturesContext.Provider value={{ departures, isLoading, error }}>
        {this.props.children}
      </DeparturesContext.Provider>
    );
  }
}

export default DeparturesProvider;





