import React from 'react';

import { createStore } from 'redux';

var result = {
    list:[
        {id:1},
        {id:2},
        {id:3}
    ]
};

var result2 = {
    list:[
        {id:4},
        {id:5}
    ]
};


var defaultState = {
    isFetching:false,
    tickets:[]
};

function reducer(state=defaultState, action) {
    switch (action.type) {
        case 'FETCH_DEPARTURES':
            console.log('fetching');

            setTimeout(function(){

                store.dispatch({
                    type:'RECEIVED_DEPARTURES',
                    tickets: result.list
                });

            },2000);

            return {
                ...state,
                tickets:[],
                isFetching:true
            };
        case 'POLL_DEPARTURES':
            console.log('polling');

            setTimeout(function(){

                store.dispatch({
                    type:'RECEIVED_DEPARTURES',
                    tickets: state.tickets.concat(result2.list)
                });

            },2000);

            return {
                ...state,
                isFetching:true
            };
        case 'RECEIVED_DEPARTURES':
            console.log('received');
            return {
                ...state,
                tickets: action.tickets,
                isFetching:false

            };

        default:
            return state;
    }
}

let store = createStore(reducer);

var count = 0;

var Departures = React.createClass({
    componentDidMount(){
        count++;
        console.log(count);
        console.log('departures mounted');

        this.unsubscribe = store.subscribe(() => this.forceUpdate());

        store.dispatch({
            type:'FETCH_DEPARTURES'
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

        store.dispatch({
            type:'FETCH_DEPARTURES'
        })
    },
    render() {
        var departures = store.getState().tickets;

        return (
            <div>
                <h2>Departures</h2>
                <p>{this.props.params.lang}</p>
                <ul>
                    {
                        departures.map((ticket) => {
                            return (
                                <li key={ticket.id}>{ticket.id}</li>
                            )
                        })
                    }
                </ul>

            </div>
        )
    }
});

export default Departures;