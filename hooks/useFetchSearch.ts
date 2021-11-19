import { useState, useEffect, useRef } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { Dayjs } from 'dayjs';
import { City } from '../interfaces';

import { Search } from '../interfaces/response';
import api from '../utils/api';
import { citiesState, departuresState, isLoadingState, operatorsState, locationsState, errorState } from '../store/states';

type fetchParams = {
    departure: City;
    destination: City;
    date: Dayjs;
};

const apiDateFormat = 'YYYY-MM-DD';
const timeoutDelay = 3000;

type fetchSearchReturn = {
    fetchSearch: (params: fetchParams) => void;
};

/**
 * Hook used to fetch search and poll (on a timeout)
 */
export const useFetchSearch = (): fetchSearchReturn => {
    const pollTimeout = useRef(null);
    const [ departure, setDeparture ] = useState<City | null>(null);
    const [ destination, setDesination ] = useState<City | null>(null);
    const [ date, setDate ] = useState<Dayjs | null>(null);

    const [ isFetching, setIsFetching ] = useState(false);
    const [ isComplete, setIsComplete ] = useState(true);
    const [ operatorsFromState, setOperators ] = useRecoilState(operatorsState);
    const [ locationsFromState, setLocations ] = useRecoilState(locationsState);
    const [ departuresFromState, setDepartures ] = useRecoilState(departuresState);
    const setIsLoading = useSetRecoilState(isLoadingState);
    const setError = useSetRecoilState(errorState);
    const [ citiesFromState, setCities ] = useRecoilState(citiesState);

    /**
     * if the state of departures has been updated after a fetch,
     * check if is complete,
     * if not, set timeout
     */
    useEffect(() => {
        if (!isComplete && !isFetching) {
            setPollTimeout();
        }
        return () => {
            clearPollTimeout();
        }
    }, [departuresFromState]);

    const setPollTimeout = () => {
        pollTimeout.current = setTimeout(fetchPoll, timeoutDelay);
    };

    const clearPollTimeout = () => clearTimeout(pollTimeout.current);

    /**
     * A lot of repeating code between calls, decided to create a wrapper
     */
    const fetchWrapper = async (apiCall: () => Promise<Search>): Promise<Search> => {
        clearPollTimeout();
        setIsFetching(true);
        try {
            const response = await apiCall();
            // keep previous operators and add new ones
            setOperators([
                ...operatorsFromState,
                ...response.operators,
            ]);
            // keep previous locations and add new ones
            setLocations([
                ...locationsFromState,
                ...response.locations,
            ]);
            setIsFetching(false);
            setIsComplete(response.complete);
            return response;
        } catch (error) {
            setIsFetching(false);
            throw new Error(error);
        }
    };

    /**
     * Action to fetch search results
     * Must update cities
     */
    const fetchSearch = async ({ departure, destination, date }: fetchParams) => {
        // set each value again in the hook for local state
        setDeparture(departure);
        setDesination(destination);
        setDate(date);
        // clear the previous departures if a new 
        setDepartures([]);
        // set to loading state
        setIsLoading(true);

        const apiCall = () => api.search({
            departure: departure?.id,
            destination: destination?.id,
            date: date.format(apiDateFormat),
        });
        try {
            const { departures, cities } = await fetchWrapper(apiCall);
            // keep previous cities and add new ones
            setCities([
                ...citiesFromState,
                ...cities,
            ]);
            // override previous departures on a new search
            setDepartures(departures);
            setIsLoading(false);
            if (!departures.length) {
                setError('No results found');
            }
        } catch (error) {
            setDepartures([]);
            setIsLoading(false);
            setError('Something went wrong while fetching');
        }
    };

    /**
     * Action to fetch poll results
     * No need to update cities
     */
    const fetchPoll = async () => {
        const apiCall = () => api.poll({
            departure: departure?.id,
            destination: destination?.id,
            date: date.format(apiDateFormat),
            index: departuresFromState.length,
        });
        try {
            const { departures } = await fetchWrapper(apiCall);
            // add new departures
            setDepartures([
                ...departuresFromState,
                ...departures,
            ]);
        } catch (error) {
            // swollow error, do not show an error without user interaction
        }
    };

    return { fetchSearch };
};