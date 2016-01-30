import { createStore } from 'redux';
import h from '../lib/helpers';
import request from 'superagent';


function fetch(params,query,poll=false) {
    return request
        .get(`https://napi.busbud.com/x-departures/${params.origin}/${params.destination}/${params.outbound_date}${(()=>{return poll? '/poll':''})()}`)
        .set('Accept', 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/')
        .query(query)
}


var defaultState = {
    //lang:'en',
    fetching:false,
    result:{}
};

function tickets(state=defaultState, action) {
    switch (action.type) {

        case 'FETCH_DEPARTURES':
            console.log('action fetch');
            fetch(action.params,action.query)
                .end((err,res) => {
                    if (err) {
                        //dispatch error
                    }
                    else {
                        console.log('fetched done');
                        console.log(res.body);
                        let result = res.body;
                        //let result = {...res.body,complete:false}; // testing poll

                        store.dispatch({
                            type:'RECEIVED_DEPARTURES',
                            result: result
                        });

                        if (!result.complete) {
                            store.dispatch({
                                type:'POLL_DEPARTURES',
                                result: result,
                                params: action.params,
                                query: action.query
                            });
                        }

                        if (!result.is_valid_route){
                            //dispatch invalid_route
                        }
                    }
                });
            return {
                ...state,
                result:{},
                fetching:true
            };

        case 'POLL_DEPARTURES':
            console.log('action poll');
            let index = action.result.departures.length;
            let query = {...action.query,index:index};
            fetch(action.params,query,true)
                .end((err,res) => {
                    if (err) {
                        //dispatch error
                    }
                    else {
                        console.log('poll fetch done');
                        console.log(res.body);
                        let result = res.body;

                        store.dispatch({
                            type:'RECEIVED_DEPARTURES',
                            result: result
                        });
                    }
                });
            return {
                ...state,
                fetching:true
            };

        case 'RECEIVED_DEPARTURES':
            console.log('action received');
            console.log('action.result',action.result);
            return {
                ...state,
                result: action.result,
                fetching:false
            };

        default:
            return state;
    }
}

let store = createStore(tickets);

export default store;