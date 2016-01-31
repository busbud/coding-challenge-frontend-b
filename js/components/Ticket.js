import React from 'react';
import h from '../lib/helpers';

var Ticket = React.createClass({
    render() {
        let ticket = this.props.ticket;
        let origin = this.props.locations.origin;
        let destination = this.props.locations.destination;
        let operator = this.props.operator;

        return (
            <div>
                <div className="row">
                    <div className="columns small-12 medium-6">
                        <div className="row">
                            <div className="columns medium-3">
                                {h.getFormattedTime(ticket.departure_time)}
                            </div>
                            <div className="columns medium-9">
                                {origin.name}
                            </div>
                        </div>
                        <div className="row">
                            <div className="columns medium-3">
                                {h.getFormattedTime(ticket.arrival_time)}
                            </div>
                            <div className="columns medium-9">
                                {destination.name}
                            </div>
                        </div>
                    </div>
                    <div className="ticket_item_operator columns small-6 medium-3 row align-middle">
                        <img className="ticket_item_operator_logo" src={h.getLogo100(operator.logo_url)} alt={operator.name}/>
                    </div>
                    <div className="columns small-6 medium-3">
                        <b>&#36;{Math.round(parseFloat(ticket.prices.total)/100)} CAD</b>
                    </div>
                </div>
            </div>
        )
    }
});

export default Ticket;