import React from 'react';
import { createStore } from 'redux';
import h from '../lib/helpers';

var result1 = {
    list:[
        {id:1},
        {id:2},
        {id:3}
    ],
    complete:false,
    obj:{
        key1:'val1',
        key2:'val1'
    }
};

var result2 = {
    list:[
        {id:4},
        {id:5}
    ],
    complete:true,
    obj:{
        key2:'val2',
        key3:'val2'
    }
};

console.log(h.mergeResult(result1,result2));

var defaultState = {
    lang:'en',
    fetching:false,
    tickets:{}
};

function reducer(state=defaultState, action) {
    switch (action.type) {
        case 'FETCH_DEPARTURES':
            console.log('fetching');

            setTimeout(function(){

                store.dispatch({
                    type:'RECEIVED_DEPARTURES',
                    tickets: result1
                });

                if (!result1.complete) {
                    store.dispatch({
                        type:'POLL_DEPARTURES'
                    });
                }
            },2000);

            return {
                ...state,
                tickets:{},
                fetching:true
            };
        case 'POLL_DEPARTURES':
            console.log('poll');

            setTimeout(function(){

                store.dispatch({
                    type:'RECEIVED_DEPARTURES',
                    tickets: h.mergeResult(state.tickets,result2)
                });

            },2000);

            return {
                ...state,
                fetching:true
            };
        case 'RECEIVED_DEPARTURES':
            console.log('received');
            return {
                ...state,
                tickets: action.tickets,
                fetching:false
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
        var departures = store.getState().tickets.list || [];

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