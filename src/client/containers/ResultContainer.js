import React, { Component } from 'react';
import LoadingCard from '../components/LoadingCard';
import Card from '../components/Card';

class ResultContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // destructure properties from props obj
    const {
      cities,
      departures,
      operators,
      locations,
      isPollingComplete,
      isSearchInitialized,
    } = this.props;

    // map departure element to a Card component
    const departuresArr = departures.map(el => (
      <Card
        key={`departure${el.id}`}
        data={el}
        cities={cities}
        operators={operators}
        locations={locations}
      />
    ));

    return (
      <div className="result-container">
        {/* Main landing page includes the festival schedule in place of search results. Once search is initialized, schedule is replaced with bus departure information */}
        {!isSearchInitialized && (
          <img
            id="osheaga-schedule"
            src="https://www.osheaga.com/uploads/osheaga/Poster/OSHEAGA-2019-flyer6x9-190801-EN.jpg?v=981dd13bf2ebb3f2dfa029230e17a6f4"
          ></img>
        )}

        {/* If polling is in progress, show the loading card to let users know that search is not complete yet */}
        {!isPollingComplete && isSearchInitialized && <LoadingCard />}
        <LoadingCard />
        {/* Display all the departures card */}
        {departuresArr}
      </div>
    );
  }
}

export default ResultContainer;
