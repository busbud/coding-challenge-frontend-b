import React from 'react';
import Paper from 'material-ui/lib/paper';
import Ticket from './Ticket';

import h from '../lib/helpers';
import {getDeparturesList} from './reducer';


var TicketList = React.createClass({
    componentDidMount(){
        const {store} = this.props;
        this.unsubscribe = store.subscribe(() => this.forceUpdate());

        store.dispatch({
            type:'FETCH_DEPARTURES',
            params: this.getSearchInput(this.props).params,
            query: this.getSearchInput(this.props).query
        })
    },
    componentWillUnmount() {
        this.unsubcribed();
    },
    componentWillReceiveProps(nextProps){
        const {store} = nextProps;

        store.dispatch({
            type:'FETCH_DEPARTURES',
            params: this.getSearchInput(nextProps).params,
            query: this.getSearchInput(nextProps).query
        })
    },
    getSearchInput(props){
        let routeParams = props.params;

        const params = {
            origin: routeParams.origin,
            destination: routeParams.dest,
            outbound_date: routeParams.date
        };

        const query = {
            adult:1,
            child:0,
            senior:0,
            lang:props.params.lang,
            currency:"CAD"
        };

        return {params,query}
    },
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