import h from '../lib/helpers';

import React from 'react';
import Ticket from './Ticket';
import SearchBar from './SearchBar';
import FilterBar from './FilterBar';
import Paper from 'material-ui/lib/paper';

let count = 0;
//const parameters = {
//    origin: 'dr5reg', //Montreal
//    destination: 'f25dvk', //NY
//    outbound_date: '2016-02-05'//1454648400000 // February 5, 2016
//};
//
//const queryString = {
//    adult:1,
//    child:0,
//    senior:0,
//    lang:"CA",
//    currency:"CAD",
//    index:6
//};


let Departures = React.createClass({
    componentDidMount(){
        count++;
        console.log(count);
        console.log('departures mounted');

        const {store} = this.props;
        this.unsubscribe = store.subscribe(() => this.forceUpdate());

        store.dispatch({
            type:'FETCH_DEPARTURES',
            params: this.getSearchInput().params,
            query: this.getSearchInput().query
        })
    },
    componentWillUnmount() {
        this.unsubcribed();
    },
    componentWillReceiveProps(nextProps){

        count++;
        console.log(count);
        console.log('new props');
        console.log(nextProps.params.lang);

        const {store} = this.props;

        store.dispatch({
            type:'FETCH_DEPARTURES',
            params: this.getSearchInput().params,
            query: this.getSearchInput().query
        })
    },
    getSearchInput(){
        let routeParams = this.props.params;

        const params = {
            origin: routeParams.origin,
            destination: routeParams.dest,
            outbound_date: routeParams.date
        };

        const query = {
            adult:1,
            child:0,
            senior:0,
            lang:this.props.params.lang,
            currency:"CAD"
        };

        return {params,query}
    },
    render() {
        const {store} = this.props;

        var result = store.getState().result;
        var departures = result.departures || [];

        console.log(departures);

        return (
            <div className="">
                <SearchBar className="search-bar"/>
                <FilterBar/>
                <ul className="ticket">
                    {
                        departures.map((ticket) => {
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

            </div>
        )
    }
});

export default Departures;