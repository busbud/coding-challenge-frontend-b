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
            <li className="ticket_item">
                <div className="row">
                    <div className="columns small-12 medium-8 ticket_item_route">
                        <div className="row align-middle align-spaced">
                            <div className="columns small-5">
                                <p className="ticket_item_cityname">{origin.city.name}</p>
                                <p className="ticket_item_time"><b>{h.getFormattedTime(ticket.departure_time)}</b></p>
                                <p>{origin.name}</p>
                            </div>
                            <div className="columns small-1 ticket_item_arrow"><i className="material-icons">arrow_forward</i></div>
                            <div className="columns small-5">
                                <p className="ticket_item_cityname">{destination.city.name}</p>
                                <p className="ticket_item_time"><b>{h.getFormattedTime(ticket.arrival_time)}</b></p>
                                <p>{destination.name}</p>
                            </div>
                        </div>
                    </div>
                    <div className="column small-12 medium-4 ticket_item_detail">
                        <div className="ticket_item_operator">
                            <img className="ticket_item_operator_logo" src={h.getResizedLogo(operator.logo_url)} alt={operator.name}/>
                        </div>
                        <div className="ticket_item_price">
                            <b>&#36;{Math.round(parseFloat(ticket.prices.total)/100)} <span className="ticket_item_currency">CAD</span></b>
                        </div>
                        <div className="ticket_item_class">
                            <div className="">{ticket.class_name}</div>
                            <div className=""><Amenities amenities={ticket.amenities}/></div>
                        </div>
                    </div>
                </div>
            </li>
        )
    }
});

export default Ticket;