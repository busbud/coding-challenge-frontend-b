import React, { createContext, useContext, useReducer } from 'react';
import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://napi.busbud.com/x-departures',
    timeout: 2000,
    headers: {
        'Accept': 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
        'X-Busbud-Token': 'PARTNER_AHm3M6clSAOoyJg4KyCg7w',
    }
});

const initialState = {
    results: [],
    locations: {},
    cities: {},
    operators: {},
    departures: {},
    searchParams: {
        from: {
            geohash: null,
            name: "",
        },
        to: {
            geohash: null,
            name: "",
        },
        date: ""
    },
    complete: false,
}
const dataMerger = (data, state, field) => {
    if (data[field] === undefined) return state[field];

    return data[field].reduce((acc, item) => {
        acc[item.id] = item;
        return acc
    }, state[field])
}
const reducer = (state, action) => {
    switch (action.type) {
        case 'LOAD_ITEMS':

            return {
                ...state,
                locations: dataMerger(action.data, state, "locations"),
                cities: dataMerger(action.data, state, "cities"),
                operators: dataMerger(action.data, state, "operators"),
                complete: action.data.complete,
                departures: dataMerger(action.data, state, "departures"),
            };
        case 'RESET_RESULTS':
            return {
                ...state,
                locations: {},
                cities: {},
                operators: {},
                complete: false,
                departures: {}
            }
        case 'SET_SEARCH_PARAM':
            return {
                ...state,
                searchParams: {
                    ...state.searchParams,
                    [action.name]: action.value
                }
            }
        default:
            return state;
    }
};



const INITIAL_RETRIES = 5;
const REQUEST_TM = 2000;

export const StateContext = createContext();
export const StateProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const data = {
        ...state,
        dispatch,
        fetchData: function fetchData(retries = INITIAL_RETRIES) {
            if (retries < 0) return;
            const isPoll = retries !== INITIAL_RETRIES;
            if (!isPoll) {
                dispatch({
                    type: "RESET_RESULTS"
                })
            }
            if (state.searchParams.from.geohash === null || state.searchParams.to.geohash === null || state.searchParams.date === "") return;
            console.log(state);
            //instance.get(`/dr5reg/f25dvk/2019-08-03/${isPoll ? 'poll' : ''}`)
            instance.get(`/${state.searchParams.from.geohash}/${state.searchParams.to.geohash}/${state.searchParams.date}/${isPoll ? 'poll' : ''}`)
                .then(function ({ data }) {
                    console.log({ data });
                    dispatch({
                        type: "LOAD_ITEMS",
                        data: data,
                    });

                    // retries until complete is not true
                    if (!data.complete) {
                        setTimeout(() => fetchData(retries - 1), REQUEST_TM);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
                .then(function () {
                    // always executed
                });
        },
    }
    return <StateContext.Provider value={data}>
        {children}
    </StateContext.Provider>
};
export const useDataProvider = () => useContext(StateContext);
