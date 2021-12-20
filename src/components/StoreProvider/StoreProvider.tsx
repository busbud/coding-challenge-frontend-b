import { useState, FC } from 'react';
import { ResponseSearch, Departure, SearchList, ResponseCity } from 'types';
import Store from 'app/store';

export const StoreProvider: FC = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [searches] = useState({} as SearchList);
  const [lang, setLang] = useState('en');
  const [departures, setDepartures] = useState([] as Array<Departure>);
  const [cities, setCities] = useState({} as Record<string, ResponseCity>);
  const [isDirty, setIsDirty] = useState(false);

  const clean = () => {
    setDepartures([]);
    setCities({});
  };

  const addSearch = (response: ResponseSearch) => {
    // Add Search
    const searchCompositeID = response.origin_city_id + response.destination_city_id;
    searches[searchCompositeID] = response;
  }

  return (
    <Store.Provider
      value={{
        searches,
        departures,
        cities,
        lang,
        isLoading: loading,
        isDirty,
        clean,
        setLang,
        toggleLoading: setLoading,
        setIsDirty,
        addSearch,
        setDepartures,
        setCities
      }}
    >
      {children}
    </Store.Provider>
  );
};