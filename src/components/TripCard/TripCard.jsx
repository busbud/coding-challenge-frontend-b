import React, { useState } from "react";
import styled from "styled-components";
import locationIcon from "../../assets/location.png";
import stage from "../../assets/stage.svg";
import sucess from "../../assets/success.svg";
import error from "../../assets/error.svg";
import ac from "../../assets/air-conditioner.svg";
import toilet from "../../assets/toilet.png";
import plug from "../../assets/plug.png";
import tv from "../../assets/tv.png";
import seat from "../../assets/seat.svg";
import wifi from "../../assets/wifi.png";
import fork from "../../assets/fork.svg";

const Card = styled.div`
  border-radius: 4px;
  box-shadow: 2px 5px 4px #d5d5d5;
  background: #fdfdfd;
  padding: 5px;
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
  width: 20px;
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

const AmenitiesSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const AmenitiesLabel = styled.span`
  font-size: 12px;
  padding: 0 5px;
`;

const AmenitiesLogo = styled.img`
  width: 25px;
`;

const AvaliabilityLogo = styled.img`
  width: 15px;
`;

const Amenities = styled.div`
  flex: 1;
  display: flex;
  padding: 10px;
  align-items: center;
`;

const Title = styled.span`
  text-align: center;
`;
const AdditionalData = styled.div``;
const formatDate = date => date.getHours() + ":" + date.getMinutes();

const DetailsSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  padding: 5px;
  @media screen and (max-width: 800px) {
    flex-direction: column;
  }
`;
export const TripCard = ({ trip, index }) => {
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
          {displayDetails ? "Hide" : "See more"} details{" "}
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
            Select{" "}
          </a>
        </SelectButton>
      </CardFooter>
      {displayDetails && (
        <DetailsSection>
          <AmenitiesSection>
            <Title> Amenities</Title>
            <Amenities>
              <AmenitiesLogo src={ac} />
              <AmenitiesLabel> Air Conditioning</AmenitiesLabel>
              <AvaliabilityLogo src={trip.amenities.ac ? sucess : error} />
            </Amenities>
            <Amenities>
              <AmenitiesLogo src={tv} />
              <AmenitiesLabel> Television </AmenitiesLabel>
              <AvaliabilityLogo src={trip.amenities.tv ? sucess : error} />
            </Amenities>
            <Amenities>
              <AmenitiesLogo src={toilet} />
              <AmenitiesLabel>Toilet </AmenitiesLabel>
              <AvaliabilityLogo src={trip.amenities.toilet ? sucess : error} />
            </Amenities>
            <Amenities>
              <AmenitiesLogo src={seat} />
              <AmenitiesLabel> Leg rooms</AmenitiesLabel>
              <AvaliabilityLogo
                src={trip.amenities.leg_room ? sucess : error}
              />
            </Amenities>
            <Amenities>
              <AmenitiesLogo src={plug} />
              <AmenitiesLabel> Power outlets</AmenitiesLabel>
              <AvaliabilityLogo
                src={trip.amenities.power_outlets ? sucess : error}
              />
            </Amenities>
            <Amenities>
              <AmenitiesLogo src={wifi} />
              <AmenitiesLabel> Wifi</AmenitiesLabel>
              <AvaliabilityLogo src={trip.amenities.wifi ? sucess : error} />
            </Amenities>
            <Amenities>
              <AmenitiesLogo src={fork} />
              <AmenitiesLabel> Food</AmenitiesLabel>
              <AvaliabilityLogo src={trip.amenities.food ? sucess : error} />
            </Amenities>
          </AmenitiesSection>
          <AdditionalData>
            <Title>Additional Informations</Title>
          </AdditionalData>
        </DetailsSection>
      )}
    </Card>
  );
};
