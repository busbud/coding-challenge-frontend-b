import { createStore, combineReducers } from 'redux';
import h from '../lib/helpers';
import request from 'superagent';
import languagePack from '../lib/language_pack';

function getLangPack(lang){
    switch (lang) {
        case 'fr':
            return languagePack.french;
        default:
            return languagePack.english;
    }
}

function getCurrentLang(lang) {}

function getDeparturesList(departures,visibility){
    switch (visibility) {
        case 'SORT_BY_PRICE':
            return departures.sort(function(a,b){
                return a.prices.total > b.prices.total;
            });
        case 'SORT_BY_DEPARTURE_TIME':
            console.log('sort by time');
            return departures.sort(function(a,b){
                const aTime = new Date(Date.parse(a.departure_time));
                const bTime = new Date(Date.parse(b.departure_time));
                return aTime > bTime;
            });
        default:
            return departures;
    }
}

function fetch(params,query,poll=false) {
    return request
        .get(`https://napi.busbud.com/x-departures/${params.origin}/${params.destination}/${params.outbound_date}${(()=>{return poll? '/poll':''})()}`)
        .set('Accept', 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/')
        .query(query)
}



function tickets(
    state={fetching:false, result:{}},
    action) {
    switch (action.type) {

        case 'FETCH_DEPARTURES':
            console.log('fetch departures');
            fetch(action.params,action.query)
                .end((err,res) => {
                    if (err) {
                        //console.log(err);
                        store.dispatch({
                            type:'NO_RESULT',
                            result: {},
                        });
                    }
                    else {
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
            console.log('polling');
            let index = action.result.departures.length;
            let query = {...action.query,index:index};
            fetch(action.params,query,true)
                .end((err,res) => {
                    if (err) {
                        //dispatch error
                    }
                    else {
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
            console.log('departures received');
            return {
                ...state,
                result: action.result,
                fetching:false
            };

        case 'NO_RESULT':
            console.log('No result');
            return {
                ...state,
                result: action.result,
                fetching:false
            };

        default:
            return state;
    }
}

function sortBy(state='SORT_BY_PRICE', action) {
    switch (action.type) {
        case 'SORT':
            return action.sortBy;
        default:
            return state;
    }
}

function filter(state='', action) {
    switch (action.type) {

        case 'FILTER_BY':

            return {
                ...state,
                ...filteredResult
            };

        case 'FILTER_BY':

            return {
                ...state,
                ...filteredResult
            };

        default:
            return state;
    }
}

function language(state=getLangPack('en'), action) {
    switch (action.type) {
        case 'CHANGE_LANGUAGE':
            console.log(action.language);
            return getLangPack(action.language);
        default:
            return state;
    }
}

const app = combineReducers({
    tickets: tickets,
    sortBy: sortBy,
    filter: filter,
    language:language
});

let store = createStore(app);

export default {
    store:store,
    getDeparturesList:getDeparturesList,
};