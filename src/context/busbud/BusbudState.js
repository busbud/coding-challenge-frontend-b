import React, { useReducer } from 'react';
import axios from 'axios';
import BusbudContext from './busbudContext';
import BusbudReducer from './busbudReducer';
import {
    SEARCH_DEPARTURES,
    SET_CITIES,
    SET_LOCATIONS,
    CLEAR_DEPARTURES,
    SET_LOADING,
    SET_LANGUAGE
} from '../types'

let busbudAccept;
let busbudToken;

if(process.env.NODE_ENV !== 'production'){
  busbudAccept = process.env.REACT_APP_BUSBUD_ACCEPT;
  busbudToken = process.env.REACT_APP_BUSBUD_TOKEN;
} else {
  busbudAccept = process.env.BUSBUD_ACCEPT;
  busbudToken = process.env.BUSBUD_TOKEN;
}

const BusbudState = props => {
    const initialState = {
        departures: [],
        cities: [],
        locations: [],
        loading: false,
        english: true,
    }

    const [state, dispatch] = useReducer(BusbudReducer, initialState);

    //Search Departures
    const searchDepartures = async (origin, destination, date, adults, children, seniors) => {
        setLoading();
        try {
          const res = await axios.get(`https://napi.busbud.com/x-departures/${origin}/${destination}/${date}`, {
          // method: 'GET',
          headers: {
          Accept: busbudAccept,
          'X-Busbud-Token': busbudToken,
          },
          parameters: JSON.stringify({
            adult: `${adults}`,
            child:`${children}`,
            senior:`${seniors}`,
            lang:'US',
            currency:'USD'
          }),
        });
        dispatch({
                type: SET_CITIES,
                payload: res.data.cities
            });
        dispatch({
            type: SET_LOCATIONS,
            payload: res.data.locations
        });
        dispatch({
          type: SEARCH_DEPARTURES,
          payload: res.data.departures
        });
        } catch(err) {
          console.log(err);
        }
      }

    //Clear Departures
    const clearDepartures = () => dispatch({ type: CLEAR_DEPARTURES});

    //Set Loading
    const setLoading = () => dispatch({ type: SET_LOADING});

    // Set Language
    const setLanguage = () => {
      dispatch({
        type: SET_LANGUAGE,
      });
    }

    return <BusbudContext.Provider
        value={{
            departures: state.departures,
            cities: state.cities,
            locations: state.locations,
            loading: state.loading,
            english: state.english,
            searchDepartures,
            clearDepartures,
            setLanguage
        }}
    >
        {props.children}
    </BusbudContext.Provider>
}

export default BusbudState

