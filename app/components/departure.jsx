import React from 'react';

export default class Departure extends React.Component {

    constructor(props) {
      super(props)
        this.state = {
            arrivalTime: this.props.departure.arrival_time,
            departureTime: this.props.departure.departure_time,
            departurePrice : this.props.departure.prices.total,
            destination : this.props.locations.filter(location => {
                return location.id == this.props.departure.destination_location_id;
            })[0],
            origin: this.props.locations.filter(location => {
                return location.id == this.props.departure.origin_location_id;
            })[0],
            operator : this.props.operators.filter(operator =>{
                return operator.id == this.props.departure.operator_id;
            })[0]
        }
    }


    render() {
        return (
            <div className="row">
                <div className="col-md-10 col-md-offset-2">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-md-4 departureTime">
                                    {this.props.departure.arrival_time}
                                </div>
                                <div className="col-md-8 departureLocation">
                                    {this.state.origin.name}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4 departureTime">
                                    {this.props.departure.arrival_time}
                                </div>
                                <div className="col-md-8 departureLocation">
                                    {this.state.destination.name}
                                </div>
                            </div>

                        </div>
                        <div className="col-md-2 departureOperator">
                          <div className="row">
                            <img src={this.state.operator.logo_url} className="img-responsive operatorImage" alt="Operator"></img>
                            </div>
                            <div className="row text-center vcenter">
                              <div className="col-md-12">
                                {this.props.departure.class_name}
                              </div>
                            </div>
                        </div>
                        <div className="col-md-3 departurePrice text-center vcenter">
                            {this.state.departurePrice}
                        </div>
                    </div>
                    <div className="row"></div>
                </div>
            </div>
        );
    }

}
