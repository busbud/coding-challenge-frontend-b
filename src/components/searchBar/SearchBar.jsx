import React, { useState, useEffect } from "react";
import styled from "styled-components";
import locationIcon from "../../assets/location.png";
import stage from "../../assets/stage.svg";
import calendar from "../../assets/calendar.svg";
import user from "../../assets/user.svg";
import { useTranslation } from "react-i18next";

const Card = styled.div`
  border-radius: 4px;
  box-shadow: 2px 5px 4px #555;
  background: white;
  padding: 15px;
  margin: 10px;
  display: flex;
  justify-content: space-between;
  width: 60%;
    @media screen and (max-width: 1200px) {
      width: 80%  
    }
    @media screen and (max-width: 800px) {
      width: 100%  
      padding: 5px;
      flex-direction: column
    }
`;

const SubContainer = styled.div`
  padding: 5px;
  display: flex;
  justify-content: space-between;
  flex: 9;
`;

const Icon = styled.img`
  flex: 2;
  padding: 0 5px;
  max-width: 23px;
  max-height: 23px;
  padding: 0 5px;
`;
const Label = styled.div`
  padding-left: 10px;
  flex: 2;
`;

const parseTrip = ({ departures, locations, operators }) => {
  return departures.map(departure => ({
    ...departure,
    originLocation: locations.filter(
      location => location.id === departure.origin_location_id
    )[0],
    arrivalLocation: locations.filter(
      location => location.id === departure.destination_location_id
    )[0],
    operator: operators.filter(
      operator => operator.id === departure.operator_id
    )[0]
  }));
};

export const SearchBar = props => {
  const [isSearching, setSearch] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    fetch(`https://napi.busbud.com/x-departures/dr5reg/f25dvk/2020-08-02`, {
      method: "GET",
      headers: new Headers({
        Accept: "application/vnd.github.cloak-preview",
        "X-Busbud-Token": "PARTNER_AHm3M6clSAOoyJg4KyCg7w"
      })
    })
      .then(res => res.json())
      .then(response => {
        setSearch(false);
        props.setTrips(parseTrip(response));
      })
      .catch(error => console.log(error));
  }, [isSearching]);
  return (
    <Card>
      <SubContainer>
        <Icon src={locationIcon} />
        <Label> NYC </Label>
      </SubContainer>
      <SubContainer>
        <Icon src={stage} />
        <Label> Montreal </Label>
      </SubContainer>
      <SubContainer>
        <Icon src={calendar} />
        <Label> 20 August 2020 </Label>
      </SubContainer>
      <SubContainer>
        <Icon src={user} />
        <Label> 1 {t("passenger")} </Label>
      </SubContainer>
    </Card>
  );
};
