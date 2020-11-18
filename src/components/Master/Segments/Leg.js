import React from 'react';
import { Translate } from 'react-redux-i18n';
import Bus from './Bus';


const Leg = (props) => {
  const legTitle =<p><Translate value="bus.Departure" /></p>

  const depart = props.data;
  const operatorName = props.operators[0].display_name;
    const operatorUrl = props.operators[0].logo_url;

  return (
    <div className="Leg legsCollapse show">
      <div className="card  bg-light mb-3 border-primary mb-3">

        <div className="card-header">
          <div className="row">

            <div className="col-4">{legTitle}</div>


            <div className="col-2 offset-6">
              <button
                className="btn btn-sm btn-dark btn-block btnToggle"
                data-toggle="collapse"
                data-target={`#legCollapse${props.data.id}`}
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                <Translate value="details.Expand" />
              </button>
            </div>
          </div>

        </div>


        <div className="card-body show" id={`legCollapse${props.data.id}`}>

          <div className="row">

            
            <Bus
                          operatorName={operatorName}
                          class={depart.class_name}
                          busStop={depart.trip_stops[0].name}
                          departTime={depart.departure_time}
                          arrivalTime={depart.arrival_time}
                          seatsLeft={depart.available_seats}
                          totalPrice={`${depart.prices.total} ${depart.prices.currency}`}
                          url={operatorUrl}
            />
                          
           

          </div>


          <br />


          <div className="row">

            <div className="col-4">
              <Translate value="bus.Stops" />
                          {': '}
              {depart.trip_stops.length}
            </div>

            <div className="col-4">
              <Translate value="bus.Duration" />
              {': '}
h
              {depart.duration}
m
            </div>

          </div>
        </div>

      </div>
    </div>

  );
};

export default Leg;
