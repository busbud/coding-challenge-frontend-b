import React, { Component } from "react";
// Third party libraries
import Typography from "@material-ui/core/Typography";
import Translate from "react-translate-component";
// Components imports
import TravelSelection from "./TravelSelection";
import TravelList from "./TravelList";
// Other imports
import Http from "./../../api/http";
// Inner imports
import "./TravelSearch.css";

class TravelSearch extends Component {
  state = {
    xDeparturesObj: []
  };

  searchBuses = (origin, destination, outboundDate) => {
    Http.getDepartures(origin, destination, outboundDate)
      .then(xDeparturesObj => {
        this.setState({ xDeparturesObj });
      })
      .catch(e => {
        console.error(e);
      });
  };

  render() {
    const { xDeparturesObj } = this.state;

    return (
      <div>
        <div className="travel-search__search-title">
          <Typography variant="title">
            <Translate content="travel.search.selection_title" />
          </Typography>
        </div>
        <TravelSelection askSearch={this.searchBuses} />
        <div className="travel-search__result-title">
          <Typography variant="title">
            <Translate content="travel.search.result_title" />
          </Typography>
        </div>
        <TravelList xDepartures={xDeparturesObj} />
      </div>
    );
  }
}

export default TravelSearch;
