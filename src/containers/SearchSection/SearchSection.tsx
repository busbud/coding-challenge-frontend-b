import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { axiosRequest } from "../../utils/AxiosUtils";
import { departuresQueryBuilder } from "../../utils/AxiosUtils";

import { City } from "../../models/City";
import { Currency } from "../../models/Currency";
import { Destination } from "../../models/Destination";
import { Operator } from "../../models/Operator";
import { XDeparture } from "../../models/XDeparture";

import "./SearchSection.scss";
import { Row, Col, Dropdown, Button, Spinner } from "react-bootstrap";

import Label from "../../components/Label/Label";
import DestinationDropdownToggle from "../../components/DestinationDropdownToggle/DestinationDropdownToggle";
import DestinationDropdownItem from "../../components/DestinationDropdownItem/DestinationDropdownItem";
import DepartureDatePicker from "../../components/DepartureDatePicker/DepartureDatePicker";
import PassengerCounter from "../../components/PassengerCounter/PassengerCounter";
import CurrencyDropdown from "../../components/CurrencyDropdown/CurrencyDropdown";
import DepartureCard from "../../components/DepartureCard/DepartureCard";

export interface IDestinationFull {
  destinations: Destination[];
  selectedDestination: Destination;
}

export interface INumberOfPassengers {
  adults: number;
  children: number;
  seniors: number;
}

export interface IDepartureQueryResponse {
  origin_city_id: string;
  destination_city_id: string;
  cities: City[];
  locations: Location[];
  operators: Operator[];
  departures: XDeparture[];
}

const SearchSection: React.FC = () => {
  const [url, setUrl] = useState("");

  const [dataLoading, setDataLoading] = useState(false);

  const { t, i18n } = useTranslation();

  const [departure, setDeparture] = useState<IDestinationFull>({
    destinations: Destination.getBosheagaDestinations(),
    selectedDestination: Destination.getBosheagaDestinations()[0],
  });

  const [arrival, setArrival] = useState<IDestinationFull>({
    destinations: Destination.getBosheagaArrivalDestinations(
      departure.selectedDestination
    ),
    selectedDestination: Destination.getBosheagaArrivalDestinations(
      departure.selectedDestination
    )[0],
  });

  const [departureDate, setDepartureDate] = useState<Date>(
    new Date(2020, 9, 9)
  );

  const [numberOfPassengers, setNumberOfPassengers] = useState<
    INumberOfPassengers
  >({
    adults: 0,
    children: 0,
    seniors: 0,
  });

  const [currency, setCurrency] = useState<Currency>(
    Currency.getDefaultCurrency(i18n.language)
  );

  const [departureQueryResponse, setDepartureQueryResponse] = useState<
    IDepartureQueryResponse
  >({
    origin_city_id: "",
    destination_city_id: "",
    cities: [],
    locations: [],
    operators: [],
    departures: [],
  });

  function changeDepartureDestination(destination: Destination) {
    setDeparture({
      ...departure,
      selectedDestination: destination,
    });
    setArrival({
      destinations: Destination.getBosheagaArrivalDestinations(destination),
      selectedDestination: Destination.getBosheagaArrivalDestinations(
        destination
      )[0],
    });
  }

  function changeArrivalDestination(destination: Destination) {
    setArrival({
      ...arrival,
      selectedDestination: destination,
    });
  }

  function changeDepartureDate(newDate: Date) {
    setDepartureDate(newDate);
  }

  function changeNumberOfAdults(count: number) {
    setNumberOfPassengers({
      ...numberOfPassengers,
      adults: count,
    });
  }

  function changeNumberOfChildren(count: number) {
    setNumberOfPassengers({
      ...numberOfPassengers,
      children: count,
    });
  }

  function changeNumberOfSeniors(count: number) {
    setNumberOfPassengers({
      ...numberOfPassengers,
      seniors: count,
    });
  }

  function changeCurrency(newCurrency: Currency) {
    setCurrency(newCurrency);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axiosRequest.get(url);

        if (response.data && response.data.is_valid_route) {
          console.log(response);

          let cities: any[] = [];
          response.data.cities.forEach((city: any) => {
            cities.push(city);
          });

          let locations: any[] = [];
          response.data.locations.forEach((location: any) => {
            locations.push(location);
          });

          let operators: any[] = [];
          response.data.operators.forEach((operator: any) => {
            operators.push(operator);
          });

          let departures: any[] = [];
          response.data.departures.forEach((departure: any) => {
            response.data.locations.forEach((location: any) => {
              if (location.id === departure.origin_location_id) {
                departure.originLocation = location
              }

              if (location.id === departure.destination_location_id) {
                departure.destinationLocation = location
              }
            });
            departures.push(departure);
          });

          setDepartureQueryResponse({
            origin_city_id: response.data.origin_city_id as string,
            destination_city_id: response.data.destination_city_id as string,
            cities: cities,
            locations: locations,
            operators: operators,
            departures: departures,
          });
          setUrl("");
          setDataLoading(false);
        }
      } catch (e) {
        console.log(e);
        setDataLoading(false);
      }
    }

    fetchData();
  }, [url]);

  return (
    <div>
      <Row className="search-section">
        {/* Departure city */}
        <Col xs={12} md>
          <Label translationKey={"DEPARTURE_CITY"} />
          <Dropdown className="destination-dropdown">
            <DestinationDropdownToggle destinationFull={departure} />
            <Dropdown.Menu>
              {departure.destinations.map(
                (destination: Destination, index: number) => (
                  <DestinationDropdownItem
                    destination={destination}
                    changeDestination={changeDepartureDestination}
                    key={index}
                  />
                )
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Col>

        {/* Arrival city */}
        <Col xs={12} md>
          <Label translationKey={"ARRIVAL_CITY"} />
          <Dropdown className="destination-dropdown">
            <DestinationDropdownToggle destinationFull={arrival} />
            <Dropdown.Menu>
              {arrival.destinations.map(
                (destination: Destination, index: number) => (
                  <DestinationDropdownItem
                    destination={destination}
                    changeDestination={changeArrivalDestination}
                    key={index}
                  />
                )
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Col>

        {/* Date */}
        <Col xs={12} md>
          <Label translationKey={"DATE"} />
          <DepartureDatePicker
            date={departureDate}
            changeDate={changeDepartureDate}
          />
        </Col>

        {/* Number of passengers */}
        <Col xs={12} md>
          <Label translationKey={"PASSENGERS"} />
          <PassengerCounter
            label={numberOfPassengers.adults > 1 ? "ADULTS" : "ADULT"}
            updateCounter={changeNumberOfAdults}
            disable={false}
          />
          <PassengerCounter
            label={numberOfPassengers.children > 1 ? "CHILDREN" : "CHILD"}
            updateCounter={changeNumberOfChildren}
            disable={true}
          />
          <PassengerCounter
            label={numberOfPassengers.seniors > 1 ? "SENIORS" : "SENIOR"}
            updateCounter={changeNumberOfSeniors}
            disable={true}
          />
        </Col>

        {/* Currency */}
        <Col xs={12} md>
          <Label translationKey={"CURRENCY"} />
          <CurrencyDropdown
            currency={currency}
            changeCurrency={changeCurrency}
          />
        </Col>

        {/* Search */}
        <Col xs={12} md>
          <Button
            className="btn-search"
            onClick={() => {
              setUrl(
                departuresQueryBuilder(
                  departure.selectedDestination.geohash,
                  arrival.selectedDestination.geohash,
                  departureDate.toISOString().substring(0, 10),
                  numberOfPassengers,
                  i18n.language,
                  currency.value
                )
              );
              setDataLoading(true);
            }}
            disabled={numberOfPassengers.adults === 0}
          >
            {t("SEARCH")}
            {dataLoading && (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className="ml-2"
              />
            )}
          </Button>
        </Col>
      </Row>
      <Row className="mt-3 d-flex justify-content-around no-gutters">
        {departureQueryResponse.departures.length > 0 &&
          departureQueryResponse.departures.map(
            (departure: XDeparture, index: number) => (
              <DepartureCard
                departureLocation={departure.originLocation.name}
                departureTime={departure.departure_time}
                arrivalLocation={departure.destinationLocation.name}
                arrivalTime={departure.arrival_time}
                price={`${(departure.prices.total / 100).toFixed(2)} ${currency.value}`}
                key={index}
              />
            )
          )}
      </Row>
    </div>
  );
};

export default SearchSection;
