import React from 'react';
import Paper from 'material-ui/lib/paper';
import Ticket from './Ticket';

import h from '../lib/helpers';
import {getDeparturesList} from './reducer';


var TicketList = React.createClass({
    render() {
        const {store} = this.props;
        var result = store.getState().tickets.result;
        var departures = result.departures || [];
        let departuresList = getDeparturesList(departures,store.getState().sortBy) || departures;

        return (
            <ul className="ticket_list column">
                {
                    departuresList.map((ticket) => {
                        let locations = h.getTicketLocations(result,ticket);
                        let operator = h.getTicketOperator(result,ticket);

                        return (
                            <Ticket key={ticket.id} operator={operator} locations={locations} ticket={ticket}/>
                        )
                    })
                }
            </ul>
        )
    }
});

export default TicketList;