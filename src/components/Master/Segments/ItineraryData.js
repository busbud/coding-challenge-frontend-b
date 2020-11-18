import React from 'react';
import { Translate } from 'react-redux-i18n';
import Leg from './Leg';

function buildLegs(departures, operators) {
    let legsDiv = [];
    departures.forEach(depart => {
        legsDiv.push(< Leg key={depart.id} legId={depart.id} data={depart} operators={operators} />);
    })

    return legsDiv;
}

const ItineraryData = (props) => {
  const legsDiv = buildLegs(props.departures, props.operators);

  return (
    <div className="segmentsList">

      <div className="alert alert-success" role="alert">
        <div className="row">
          <div className="col-3">

              <Translate value="bus.YourTrip"/>
          </div>
        </div>
      </div>

          {legsDiv}


    </div>
  );
};

export default ItineraryData;
