import React, { Component, createContext } from "react";

import { serialize } from "./../../utils/serialize";
import { extendCities } from "./../../utils/helper";

export const DeparturesContext = createContext();

class DeparturesProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      departures: [],
      operators: [],
      locations: [],
      cities: null,
      originCityId: null,
      destinationCityId: null,
      isLoading: false,
      error: null,
      index: 0,
    };

    this.params = {
      urlParams: {
        origin: "dr5reg",
        destination: "f25dvk",
        outbound_date: "2019-08-02"
      },
      searchParams: {
        adult: 1,
        child: 0,
        senior: 0,
        lang: "en",
        currency: "USD",
      }
    }
  }


  async fetchDepartures(urlParams, searchParams, index = 0, loop = 0) {

    const searchParamsSerialize = serialize(searchParams);
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

    const urlComplete = `https://napi.busbud.com/x-departures/${urlParams.origin}/${urlParams.destination}/${urlParams.outbound_date}?${searchParamsSerialize}`
    const fetchCompleteResponse = await fetch(urlComplete, init)
    const completeResponse = await fetchCompleteResponse.json()


    this.setState({
      cities: extendCities(completeResponse.cities, completeResponse.origin_city_id, completeResponse.destination_city_id),
      locations: completeResponse.locations,
      originCityId: completeResponse.origin_city_id,
      destinationCityId: completeResponse.destination_city_id,
    })

    const url = `https://napi.busbud.com/x-departures/${urlParams.origin}/${urlParams.destination}/${urlParams.outbound_date}/poll?${searchParamsSerialize}&index=${index}`
    const fetchResponse = await fetch(url, init)
    const response = await fetchResponse.json()

    const departures = this.state.departures.concat(response.departures);
    const operators = this.state.operators.concat(response.operators);

    if (!response.complete) {
      this.setState({
        isLoading: true,
      })
      setTimeout(() => this.fetchDepartures(urlParams, searchParams, response.departures.length, loop + 1), 1500)
    } else {
      this.setState({
        isLoading: false,
      })
    }

    this.setState({
      departures,
      operators
    })
  }

  componentDidMount() {
    this.fetchDepartures(this.params.urlParams, this.params.searchParams);
  }


  render() {
    const {
      params,
      state: {
        departures,
        originCityId,
        destinationCityId,
        operators,
        locations,
        cities,
        isLoading,
        error
      }
    } = this;

    return (
      <DeparturesContext.Provider value={{
        params,
        originCityId,
        destinationCityId,
        departures,
        operators,
        locations,
        cities,
        isLoading,
        error
      }}>
        {this.props.children}
      </DeparturesContext.Provider>
    );
  }
}

export default DeparturesProvider;





