import React, { useState } from "react";
import styled from "styled-components";
import locationIcon from "../../assets/location.png";
import stage from "../../assets/stage.svg";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { Amenities } from "./Amenities";
import { AdditionalInformation } from "./Additional";
import arrow from "../../assets/arrow-down.png";

const Card = styled.div`
  border-radius: 4px;
  box-shadow: 2px 5px 4px #d5d5d5;
  background: #fdfdfd;
  padding: 10px;
  margin: 10px;
  display: column;
  @media screen and (max-width: 800px) {
    margin: 5px 0px;
  }
`;

const Section = styled.div`
  display: flex;
  padding: 5px 15px;
  color: #50c4c9;
  font-weight: bold;
`;

const CardHeader = styled.div`
  display: flex;
  padding: 5px;
  justify-content: space-between;
  color: #50c4c9;
  font-weight: bold;
  font-size: 22px;
  margin-bottom: 10px;
`;

const CardFooter = styled.div`
  display: flex;
  padding: 5px;
  justify-content: space-between;
  margin-top: 10px;
`;

const OperatorLogo = styled.img`
  width: 150px;
`;

const PriceContainer = styled.div``;

const Currency = styled.span``;
const Amount = styled.span``;

const Icon = styled.img`
  padding: 0 5px;
  width: 25px;
  @media screen and (max-width: 800px) {
    height: 20px;
  }
`;
const DateContainer = styled.span`
  padding: 0 5px;
`;
const Address = styled.span`
  padding: 0 5px;
`;

const DetailsButton = styled.button`
  border: none;
  cursor: pointer;
  background: none;
  color: #f19020;
  font-size: 15px;
  font-weight: bold;
`;

const SelectButton = styled.button`
  cursor: pointer;
  text-decoration: none;
  border-radius: 4px;
  padding: 5px;
  background: #f19020;
  font-size: 16px;
  color: white;
  border: 1px solid #f19020;
`;

const formatDate = date => moment(date).format("hh:mm A");

const DetailsSection = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 15px;
  padding: 5px;
  @media screen and (max-width: 800px) {
    flex-direction: column;
  }
`;
export const TripCard = ({ trip, index }) => {
  const { t, i18n } = useTranslation();
  moment.locale(i18n.language);
  const [displayDetails, setDisplayDetails] = useState(false);
  return (
    <Card key={index}>
      <CardHeader>
        <OperatorLogo src={trip.operator.logo_url} />
        <PriceContainer>
          <Currency> {trip.prices.currency}</Currency>
          <Amount> {(trip.prices.total / 100).toFixed(2)}</Amount>
        </PriceContainer>
      </CardHeader>
      <Section>
        <Icon src={locationIcon} />
        <DateContainer>
          {" "}
          {formatDate(new Date(trip.departure_time))}{" "}
        </DateContainer>
        <Address>
          {" "}
          {trip.originLocation.address[1] + " - " + trip.originLocation.name}
        </Address>
      </Section>
      <Section>
        <Icon src={arrow} />
      </Section>
      <Section>
        <Icon src={stage} />
        <DateContainer>
          {" "}
          {formatDate(new Date(trip.arrival_time))}{" "}
        </DateContainer>
        <Address>
          {" "}
          {trip.arrivalLocation.address[1] + " - " + trip.arrivalLocation.name}
        </Address>
      </Section>
      <CardFooter>
        <DetailsButton onClick={() => setDisplayDetails(!displayDetails)}>
          {" "}
          {t(displayDetails ? "hideDetails" : "showDetails")}
        </DetailsButton>
        <SelectButton>
          <a
            href={trip.links.deeplink}
            target="_blank"
            style={{
              textDecoration: "none",
              color: "white",
              fontWeight: "bold",
              padding: "5px"
            }}
          >
            {" "}
            {t("select")}{" "}
          </a>
        </SelectButton>
      </CardFooter>
      {displayDetails && (
        <DetailsSection>
          <AdditionalInformation {...trip} classType={trip.class} />
          <Amenities amenities={trip.amenities} />
        </DetailsSection>
      )}
    </Card>
  );
};
