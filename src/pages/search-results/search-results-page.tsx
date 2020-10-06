import React, { useState } from "react";
import useFetch from "react-fetch-hook";
import {
  Link,
  Stack,
  Icon,
  Progress,
  Skeleton,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Divider,
} from "@chakra-ui/core";

import { Operator, XDeparture, QueryDepartureResult } from "../../types";

import { useQuery, getBusbudXDeparturesUrl } from "../../shared/utils";
import {
  BUSBUD_API_HEADERS,
  POLLING_INTERVAL,
  GEOHASHES,
} from "../../shared/constants";

import { SearchResultsLayout } from "./search-results-layout";
import { SearchResultsList } from "./search-results-list";
import {
  ResultsFiltersForm,
  ResultsFiltersFormData,
} from "./results-filters-form";
import deepmerge from "deepmerge";
import {
  Canonical,
  HrefLangAlternates,
  PageDescription,
  PageTitle,
  SocialMediaMetaTags,
} from "../../shared/components";
import { useLocation } from "react-router-dom";

const EMPTY_QUERY_DEPARTURE_RESULT = {
  origin_city_id: "",
  destination_city_id: "",
  cities: [],
  locations: [],
  operators: [],
  departures: [],
  complete: true,
  ttl: 0,
  is_valid_route: false,
};

type SearchResultsPageProps = {};
export const SearchResultsPage: React.FunctionComponent<SearchResultsPageProps> = () => {
  const { pathname, search } = useLocation();

  const [dataCache, setDataCache] = useState<QueryDepartureResult>(
    EMPTY_QUERY_DEPARTURE_RESULT
  );

  const [needsPolling, setNeedsPolling] = useState<boolean>(false);

  const searchParams = useQuery();
  const [searchUrl, setSearchUrl] = useState<RequestInfo>(
    getBusbudXDeparturesUrl(searchParams)
  );
  const [searchProgressStatus, setSearchProgressStatus] = useState<number>(5);

  const [resultsFilters, setResultsFilters] = useState<ResultsFiltersFormData>(
    {}
  );

  const isDepartureVisibleCallback = (departure: XDeparture): boolean => {
    // TODO it could be possible to put all those filters in one object,
    // and make this code more automatic, but it would be less readable

    const { minPrice, maxPrice, operators, classes } = resultsFilters;

    return (
      filterDepartureByMinPrice(departure, minPrice) &&
      filterDepartureByMaxPrice(departure, maxPrice) &&
      filterDepartureByOperator(departure, operators) &&
      filterDepartureByClass(departure, classes)
    );
  };

  // Page change - Reinitialise search state fully
  React.useEffect(() => {
    setSearchUrl(getBusbudXDeparturesUrl(searchParams));
    setSearchProgressStatus(5);
    setNeedsPolling(false);
  }, [searchParams, setSearchUrl, setSearchProgressStatus, setNeedsPolling]);

  const { isLoading, data, error } = useFetch<QueryDepartureResult>(
    searchUrl,
    { headers: BUSBUD_API_HEADERS },
    {
      depends: [searchUrl],
    }
  );

  // When fetching is happening
  React.useEffect(() => {
    // Only do this after the data has been fetched and received
    if (!isLoading && data) {
      setDataCache((previousCache) => deepmerge(previousCache, data));
      setNeedsPolling(!data.complete);
      if (data.complete) {
        setSearchProgressStatus(100);
      }
    }
    return () => {};
  }, [isLoading, data, setDataCache, setNeedsPolling, setSearchProgressStatus]);

  // Set up polling after waiting for a reasonable amount of time
  React.useEffect(() => {
    if (needsPolling) {
      const timer = setTimeout(() => {
        // wait 3 seconds
        // Set new endpoint for data polling
        const pollUrl = getBusbudXDeparturesUrl({
          ...searchParams,
          isPolling: true,
          index: dataCache?.departures?.length,
        });
        setSearchUrl(pollUrl);
        // Update progress bar
        const newProgressPercent = (100 - searchProgressStatus) / 2;
        setSearchProgressStatus(newProgressPercent);
        // Reset polling need
        setNeedsPolling(false);
      }, POLLING_INTERVAL);
      return () => clearTimeout(timer);
    }
  }, [needsPolling, dataCache, searchParams, searchProgressStatus]);

  if (isLoading && !dataCache) {
    return (
      <SearchResultsLayout aside={<Skeleton height="25rem" />}>
        <Skeleton height="25rem" width="100%" />
      </SearchResultsLayout>
    );
  }

  if (error) {
    return (
      <SearchResultsLayout>
        <Stack spacing="2rem">
          <Alert
            status="error"
            flexDirection="column"
            justifyContent="center"
            textAlign="center"
            height="16rem"
          >
            <AlertIcon size="1.5rem" />
            <AlertTitle as="strong" margin="2rem 0 0.5rem" fontSize="lg">
              There was an issue processing your request.
            </AlertTitle>
            <AlertDescription as="span" fontSize="md">
              Try refreshing the page or{" "}
              <Link
                isExternal
                href="https://www.busbud.com/en-ca/about/contact"
                color="red.500"
              >
                contact us <Icon name="external-link" mx="2px" />
              </Link>
            </AlertDescription>
          </Alert>
          {dataCache && (
            <>
              <Divider orientation="horizontal" />
              <SearchResultsList
                addToSearchDataCallback={() => {}}
                isDepartureVisible={() => true}
                {...dataCache}
              />
            </>
          )}
        </Stack>
      </SearchResultsLayout>
    );
  }

  const resultsFilteringData = dataCache ? extractFilteringData(dataCache) : {};
  const [origin] =
    Object.entries(GEOHASHES).find(
      ([key, value]) => value === searchParams.origin
    ) || [];
  const [destination] =
    Object.entries(GEOHASHES).find(
      ([key, value]) => value === searchParams.destination
    ) || [];
  return (
    <SearchResultsLayout
      aside={
        <ResultsFiltersForm
          onFiltersChange={(filterValues: ResultsFiltersFormData) => {
            setResultsFilters(() => filterValues);
          }}
          {...resultsFilteringData}
        />
      }
    >
      <PageTitle title={`${origin} to ${destination} bus tickets`} />
      <PageDescription
        description={`${dataCache.length} available between ${origin} to ${destination}, from $${resultsFilteringData.minPrice} to $${resultsFilteringData.maxPrice}`}
      />

      {/* CAVEAT if we wanted, we could filter the parameters passed to the Canonical tag */}
      <Canonical path={`${pathname}${search}`} />
      <HrefLangAlternates />
      <SocialMediaMetaTags />
      <Stack spacing="2rem">
        {dataCache && !dataCache.complete && (
          <Progress
            color="orange"
            hasStripe
            isAnimated
            borderRadius="lg"
            size="lg"
            value={searchProgressStatus}
          />
        )}
        {dataCache?.complete && dataCache?.departures?.length === 0 ? (
          <Alert
            status="info"
            flexDirection="column"
            justifyContent="center"
            textAlign="center"
            height="16rem"
          >
            <AlertIcon size="1.5rem" />
            <AlertTitle as="strong" margin="2rem 0 0.5rem" fontSize="lg">
              There are no results for this itinerary.
            </AlertTitle>
            <AlertDescription as="span" fontSize="md">
              You can try again with different cities or on another date.
            </AlertDescription>
          </Alert>
        ) : (
          <SearchResultsList
            addToSearchDataCallback={() => {}}
            isDepartureVisible={isDepartureVisibleCallback}
            {...dataCache}
          />
        )}
      </Stack>
    </SearchResultsLayout>
  );
};

const DEFAULT_FILTERING_DATA: ResultsFiltersFormData = {
  minPrice: -1,
  maxPrice: -1,
  operators: [],
  classes: [],
};
const extractFilteringData = ({
  departures,
  operators,
}: QueryDepartureResult): ResultsFiltersFormData => {
  const filteringData = departures.reduce(
    (filteringData: ResultsFiltersFormData, departure: XDeparture) => {
      // Price
      const priceTotal = Number(departure.prices.total);
      if (
        filteringData.minPrice > priceTotal ||
        filteringData.minPrice === -1
      ) {
        filteringData.minPrice = priceTotal;
      }
      if (
        filteringData.maxPrice < priceTotal ||
        filteringData.maxPrice === -1
      ) {
        filteringData.maxPrice = priceTotal;
      }
      filteringData.minPrice = Math.trunc(Number(filteringData.minPrice) / 100);
      filteringData.maxPrice = Math.trunc(
        Number(filteringData.maxPrice) / 100 + 1
      );

      // Class
      filteringData.classes.push(departure.class);

      return filteringData;
    },
    DEFAULT_FILTERING_DATA
  );

  // Removing duplicates and sorting Class
  filteringData.classes = Array.from(
    new Set(filteringData.classes)
  ).sort((classA: string, classB: string) =>
    classA.toUpperCase().localeCompare(classB.toUpperCase())
  );

  // Operators
  filteringData.operators = operators.sort(
    (operatorA: Operator, operatorB: Operator) =>
      operatorA.display_name
        .toUpperCase()
        .localeCompare(operatorB.display_name.toUpperCase())
  );

  // Amenities ?
  // Location type ?

  return filteringData;
};

const filterDepartureByOperator = (
  departure: XDeparture,
  selectedOperators: string[] = []
) => {
  const isNotFiltered = !(selectedOperators.length > 0);
  const departureIsServedByOneOfTheOperator = !!selectedOperators.find(
    (operatorId: string) => operatorId === departure.operator_id
  );
  return isNotFiltered || departureIsServedByOneOfTheOperator;
};

const filterDepartureByMinPrice = (departure: XDeparture, minPrice: number) => {
  const isNotFiltered = !minPrice;
  const departureIsUnderMinPrice = departure.prices.total / 100 >= minPrice;
  return isNotFiltered || departureIsUnderMinPrice;
};

const filterDepartureByMaxPrice = (departure: XDeparture, maxPrice: number) => {
  const isNotFiltered = !maxPrice;
  const departureIsUnderMaxPrice = departure.prices.total / 100 <= maxPrice;
  return isNotFiltered || departureIsUnderMaxPrice;
};

const filterDepartureByClass = (
  departure: XDeparture,
  selectedClasses: string[] = []
) => {
  const isNotFiltered = !(selectedClasses.length > 0);
  const departureIsOfLocationType = !!selectedClasses.find(
    (className) => className === departure.class
  );

  return isNotFiltered || departureIsOfLocationType;
};
