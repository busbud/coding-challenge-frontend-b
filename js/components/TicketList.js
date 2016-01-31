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
            <ul className="ticket column">
                {
                    departuresList.map((ticket) => {
                        let locations = h.getTicketLocations(result,ticket);
                        let operator = h.getTicketOperator(result,ticket);

                        return (
                            <li className="ticket_item" key={ticket.id}>
                                <Paper className="ticket_item_paper" children={<Ticket operator={operator} locations={locations} ticket={ticket}/>}/>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }
});

export default TicketList;