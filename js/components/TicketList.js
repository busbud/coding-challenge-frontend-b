import React from 'react';
import Paper from 'material-ui/lib/paper';
import Ticket from './Ticket';
import CircularProgress from 'material-ui/lib/circular-progress';
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
        this.unsubcribe();
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
    renderFetching(){
        const {store} = this.props;

        if (store.getState().tickets.fetching) {
            return (
                <li className="ticket_item ticket_item_fetching">
                    <CircularProgress/>
                </li>
            )
        }
    },
    renderRefresh(departures){
        const {store} = this.props;

        if (!store.getState().tickets.fetching && !departures.length) {
            console.log('here');
            return (
                <li className="ticket_item ticket_item_refresh">No results, please refresh</li>
            )
        }
    },
    render() {
        const lang = this.props.params.lang;
        const {store} = this.props;
        const result = store.getState().tickets.result;
        const departures = result.departures || [];
        const departuresList = getDeparturesList(departures,store.getState().sortBy) || departures;

        return (
            <ul className="ticket_list column">
                {
                    departuresList.map((ticket) => {
                        let locations = h.getTicketLocations(result,ticket);
                        let operator = h.getTicketOperator(result,ticket);

                        return (
                            <Ticket key={ticket.id} operator={operator} locations={locations} ticket={ticket} lang={lang}/>
                        )
                    })
                }
                {this.renderFetching()}
                {this.renderRefresh(departures)}
            </ul>
        )
    }
});

export default TicketList;