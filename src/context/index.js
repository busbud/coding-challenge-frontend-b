import React, { useState } from "react";

const AppContext = React.createContext();

const AppContextProvider = ({ children }) => {
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [departures, setDepartures] = useState([]);
  const [locations, setLocations] = useState([]);
  const [operators, setOperators] = useState([]);
  const [cities, setCities] = useState([]);
  const value = {
    searched,
    setSearched,
    loading,
    setLoading,
    departures,
    setDepartures,
    locations,
    setLocations,
    operators,
    setOperators,
    cities,
    setCities,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export { AppContext, AppContextProvider };
