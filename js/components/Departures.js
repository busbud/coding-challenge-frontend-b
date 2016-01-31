import React from 'react';
import SearchBar from './SearchBar';
import FilterBar from './FilterBar';
import TicketList from './TicketList';


let Departures = React.createClass({
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
        return (
            <div className="">
                <SearchBar {...this.props}/>
                <div className="row">
                    <FilterBar {...this.props}/>
                    <TicketList {...this.props}/>
                </div>
            </div>
        )
    }
});

export default Departures;