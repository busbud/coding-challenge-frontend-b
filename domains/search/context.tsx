import {
  FC, createContext, useContext, useState, useMemo, useEffect,
} from 'react';
import { useQuery } from 'react-query';

import { publicRuntimeConfig } from 'configs/envs';
import { Search, SearchResponse } from 'domains/search/models';
import { DepartureItem } from 'domains/departure';

export type SearchContextValue = {
  departures: DepartureItem[];
  isLoading: boolean;
};

const SearchContext = createContext<SearchContextValue | undefined>(undefined);

export type SearchProviderProps = {
  locale: string
  origin: string
  destination: string
  outboundDate: string
  adults: string
  searchInitialResponse: SearchResponse
};

export const SearchProvider: FC<SearchProviderProps> = ({
  locale,
  origin,
  destination,
  outboundDate,
  adults,
  searchInitialResponse,
  children,
}) => {
  const [pollingEnabled, setPollingEnabled] = useState(!searchInitialResponse.complete);
  const [searchResponse, setSearchResponse] = useState(searchInitialResponse);
  const getDeparturesPoll = () => Search.getDeparturesPoll(
    origin,
    destination,
    outboundDate,
    adults,
    searchResponse.departures.length,
  );
  const { data: searchPollResponse, isLoading } = useQuery('search', getDeparturesPoll, {
    enabled: pollingEnabled,
    refetchInterval: publicRuntimeConfig.POLLING_INTERVAL,
    refetchOnMount: false,
  });

  useEffect(() => {
    if (!searchPollResponse || searchPollResponse.complete === true) {
      setPollingEnabled(false);
    }
  }, [searchPollResponse]);

  useEffect(() => {
    if (searchPollResponse) {
      const newSearchResponse = Search.withAddedPolling(searchInitialResponse, searchPollResponse);
      setSearchResponse(newSearchResponse);
    }
  }, [searchInitialResponse, searchPollResponse]);

  const departures = useMemo(() => {
    const search = Search.fromApi(searchResponse);
    return search.departures.map((departure) => departure.getDepartureItem(locale));
  }, [searchResponse, locale]);

  const contextValue = useMemo(() => ({ departures, isLoading }),
    [departures, isLoading]);

  return <SearchContext.Provider value={contextValue}>{children}</SearchContext.Provider>;
};

SearchProvider.displayName = 'SearchProvider';

export function useSearch(): SearchContextValue {
  const context = useContext(SearchContext);
  if (typeof context === 'undefined') {
    throw new Error(`'useSearch()' must be used within a '${SearchProvider.displayName}'`);
  }

  return context;
}
