import React, { useContext, useRef } from "react";
import { useTranslation } from "react-i18next";

import { AppContext } from "context";
import { currencyFormatter } from "utils/price";
import { formattedDate } from "helpers/date";
import Container from "commons/Container";
import FakeLoader from "commons/FakeLoader";

import {
  DeparturesWrapper,
  OperatorImage,
  Box,
  CityBox,
  CityBoxContent,
  CityBoxTitle,
  CityBoxName,
  CityBoxTime,
  CityBoxOverlay,
  OperatorBox,
  OperatorPrice,
} from "./styles";

const DeparturesList = () => {
  const { t } = useTranslation();
  const myRef = useRef(null);
  const {
    departures = [],
    locations = [],
    operators = [],
    cities = [],
    loading = false,
    searched = false,
  } = useContext(AppContext);

  if (!searched) {
    return <></>;
  }

  if (searched && loading) {
    return (
      <DeparturesWrapper>
        <Container>
          <h2>{t("departuresSearchMessage")}</h2>
          <Box>
            <CityBox loading="true">
              <FakeLoader style={{ width: "50%", marginTop: 20 }} />
              <FakeLoader style={{ width: "90%", marginBottom: 30 }} />
              <FakeLoader style={{ width: "70%" }} />
              <FakeLoader style={{ width: "40%" }} />
            </CityBox>
            <CityBox loading="true">
              <FakeLoader style={{ width: "50%", marginTop: 20 }} />
              <FakeLoader style={{ width: "90%", marginBottom: 30 }} />
              <FakeLoader style={{ width: "70%" }} />
              <FakeLoader style={{ width: "40%" }} />
            </CityBox>
            <OperatorBox loading="true">
              <FakeLoader style={{ width: "50%", marginTop: 20 }} />
              <FakeLoader style={{ width: "90%", marginBottom: 30 }} />
              <FakeLoader style={{ width: "70%" }} />
              <FakeLoader style={{ width: "40%" }} />
            </OperatorBox>
          </Box>
        </Container>
      </DeparturesWrapper>
    );
  }

  if (
    searched &&
    !loading &&
    !departures &&
    !locations &&
    !operators &&
    !cities
  ) {
    return (
      <DeparturesWrapper>
        <Container>
          <h2>{t("departuresNotFoundMessage")}</h2>
        </Container>
      </DeparturesWrapper>
    );
  }

  if (
    !departures?.length ||
    !locations?.length ||
    !operators?.length ||
    !cities?.length
  ) {
    return (
      <DeparturesWrapper>
        <Container>
          <h2>{t("departuresErrorMessage")}</h2>
        </Container>
      </DeparturesWrapper>
    );
  }

  const reducedDepartures = departures.reduce((departuresArray, departure) => {
    const destination = locations.find(
      ({ id }) => departure.destination_location_id === id
    );
    const origin = locations.find(
      ({ id }) => departure.origin_location_id === id
    );
    const operator = operators.find(({ id }) => departure.operator_id === id);

    origin.city = cities.find(({ id }) => origin.city_id === id);
    destination.city = cities.find(({ id }) => destination.city_id === id);

    departuresArray.push({
      ...departure,
      origin,
      destination,
      operator,
    });

    return departuresArray;
  }, []);

  myRef?.current?.scrollIntoView();

  return (
    <DeparturesWrapper ref={myRef}>
      <Container>
        <h2>{t("departuresFound")}</h2>
        {reducedDepartures.map(
          ({
            id,
            operator,
            origin,
            departure_time,
            destination,
            arrival_time,
            prices,
          }) => (
            <Box key={id}>
              <CityBox image_url={origin.city.hero_image_url}>
                <CityBoxOverlay />
                <CityBoxContent>
                  <CityBoxTitle>{t("origin")}</CityBoxTitle>
                  <div>
                    <CityBoxTime>{formattedDate(departure_time)}</CityBoxTime>
                    <CityBoxName>
                      {origin.name} - {origin.city.name}
                    </CityBoxName>
                  </div>
                </CityBoxContent>
              </CityBox>
              <CityBox image_url={destination.city.hero_image_url}>
                <CityBoxOverlay />
                <CityBoxContent>
                  <CityBoxTitle>{t("destination")}</CityBoxTitle>
                  <div>
                    <CityBoxTime>{formattedDate(arrival_time)}</CityBoxTime>
                    <CityBoxName>
                      {destination.name} - {destination.city.name}
                    </CityBoxName>
                  </div>
                </CityBoxContent>
              </CityBox>
              <OperatorBox>
                <OperatorImage src={operator.logo_url} alt={operator.name} />
                <OperatorPrice>{currencyFormatter(prices.total)}</OperatorPrice>
              </OperatorBox>
            </Box>
          )
        )}
      </Container>
    </DeparturesWrapper>
  );
};

export default DeparturesList;
