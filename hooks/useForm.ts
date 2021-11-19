import { useState, useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { City } from '../interfaces';
import { useFetchSearch } from './useFetchSearch';
import { isLoadingState, errorState } from '../store/states';

type useFormValues = {
    departure: City;
    destination: City;
    date: Dayjs,
};

type useFormCities = {
    departureCities: City[];
    destinationCities: City[];
};

type useFormEvents = {
    onDepartureChange: (city: City | null) => void;
    onDesinationChange: (city: City | null) => void;
    onDateChange: (date: Dayjs) => void;
    onCitiesSwap: () => void;
    onSubmit: () => void;
};

type useFormSearchReturn = {
    values: useFormValues;
    cities: useFormCities;
    events: useFormEvents;
    isValid: boolean;
    canSwap: boolean;
};

/**
 * Filters out a city from the list of cities.
 * Used to avoid users from selecting the same city for both departure and destination
 */
const filterCities = ({ id = '', cities = [] }: { id: string, cities: City[] }): City[] => {
    if (!id) {
        return cities;
    }
    return cities.filter(city => city.id !== id );
}

const today = dayjs();

export const useSearchForm = (cities: City[]): useFormSearchReturn => {
    const isLoading = useRecoilValue(isLoadingState);
    const setError = useSetRecoilState(errorState);
    const [ departure, setDeparture ] = useState<City | null>(null);
    const [ isValid, setIsValid ] = useState<boolean>(false);
    const [ destination, setDesination ] = useState<City | null>(null);
    const [ date, setDate ] = useState<Dayjs | null>(today);
    const [ departureCities, setDepartureCities ] = useState<City[]>(cities);
    const [ destinationCities, setDestinationCities ] = useState<City[]>(cities);
    const { fetchSearch } = useFetchSearch();
    const canSwap = !!departure?.id || !!destination?.id;

    const onDepartureChange = (city: City | null) => {
        setDestinationCities(filterCities({ id: city?.id, cities }));
        setDeparture(city);
    };

    const onDesinationChange = (city: City | null) => {
        setDepartureCities(filterCities({ id: city?.id, cities }));
        setDesination(city);
    };

    const onCitiesSwap = () => {
        onDepartureChange(destination);
        onDesinationChange(departure);
    };

    const onDateChange = (date: Dayjs) => {
        setDate(date);
        if (!isDateValid()) {
            setError('Choose a date that is in the future');
        }
    };

    const isDateValid = () => !date.isBefore(today);

    const isFormValid = (): boolean => {
        return !isLoading && isDateValid() && !!departure?.id && !!destination?.id;
    };

    const onSubmit = () => {
        if (isValid) {
            fetchSearch({
                departure,
                destination,
                date,
            });
        }
    };

    useEffect(() => {
        setIsValid(isFormValid());
    }, [departure, destination, date, isLoading]);

    return {
        values: {
            departure,
            destination,
            date,
        },
        cities: {
            departureCities,
            destinationCities,
        },
        events: {
            onDepartureChange,
            onDesinationChange,
            onDateChange,
            onCitiesSwap,
            onSubmit,
        },
        isValid,
        canSwap,
    };
};