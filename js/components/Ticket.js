import React from 'react';
import h from '../lib/helpers';
import Amenities from './Amenities';

var Ticket = React.createClass({
    render() {
        let ticket = this.props.ticket;
        let origin = this.props.locations.origin;
        let destination = this.props.locations.destination;
        let operator = this.props.operator;

        return (
            <div className="ticket_item_innerwrapper row">
                <div className="ticket_item_route columns small-12 medium-8">
                    <div className="row align-middle align-spaced">
                        <div className="columns small-5">
                            <p className="ticket_item_cityname">{origin.city.name}</p>
                            <p className="ticket_item_time"><b>{h.getFormattedTime(ticket.departure_time)}</b></p>
                            <p>{origin.name}</p>
                        </div>
                        <div className="ticket_item_arrow columns small-1"><i className="material-icons">arrow_forward</i></div>
                        <div className="columns small-5">
                            <p className="ticket_item_cityname">{destination.city.name}</p>
                            <p className="ticket_item_time"><b>{h.getFormattedTime(ticket.arrival_time)}</b></p>
                            <p>{destination.name}</p>
                        </div>
                    </div>
                </div>
                <div className="ticket_item_info column small-12 medium-4 ">
                    <div className="row align-stretch">
                        <div className="ticket_item_operator columns align-middle small-order-2">
                            <img className="ticket_item_operator_logo" src={h.getResizedLogo(operator.logo_url)} alt={operator.name}/>
                        </div>
                        <div className="ticket_item_price columns small-5 align-middle small-order-3">
                            <b>&#36;{Math.round(parseFloat(ticket.prices.total)/100)} <span className="ticket_item_currency">CAD</span></b>
                        </div>
                        <div className="ticket_item_class columns small-4 medium-12 small-order-1 medium-order-3">
                            <div className="row align-middle">
                                <div className="column small-12 medium-4 large-3">{ticket.class_name}</div>
                                <div className="column"><Amenities amenities={ticket.amenities}/></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

export default Ticket;