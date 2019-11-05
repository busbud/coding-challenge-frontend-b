import React from "react";
import styled from "styled-components";
import sucess from "../../assets/success.svg";
import error from "../../assets/error.svg";
import ac from "../../assets/air-conditioner.svg";
import toilet from "../../assets/toilet.png";
import plug from "../../assets/plug.png";
import tv from "../../assets/tv.png";
import seat from "../../assets/seat.svg";
import wifi from "../../assets/wifi.png";
import fork from "../../assets/fork.svg";
import { useTranslation } from "react-i18next";

const AmenitiesSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  box-shadow: 14px 20px 52px -2px rgba(213, 213, 213, 1);
  padding: 25px;
  margin-bottom: 20px;
  border: 2px solid #f7f7f7;
`;

const AmenitiesLabel = styled.span`
  font-size: 14px;
  padding: 0 5px;
`;

const AmenitiesLogo = styled.img`
  width: 25px;
`;

const AvaliabilityLogo = styled.img`
  width: 25px;
`;

const AmenitiesContainer = styled.div`
  flex: 1;
  display: flex;
  padding: 10px;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.span`
  text-align: center;
  margin-bottom: 10px;
  color: #50c4c9;
  font-weight: bold;
`;

const amenitiesList = [
  {
    name: "ac",
    logo: ac,
    translation: "ac"
  },
  {
    name: "tv",
    logo: tv,
    translation: "tv"
  },
  {
    name: "toilet",
    logo: toilet,
    translation: "toilet"
  },
  {
    name: "leg_room",
    logo: seat,
    translation: "legRoom"
  },
  {
    name: "power_outlets",
    logo: plug,
    translation: "power"
  },
  {
    name: "wifi",
    logo: wifi,
    translation: "wifi"
  },
  {
    name: "food",
    logo: fork,
    translation: "food"
  }
];

export const Amenities = ({ amenities }) => {
  const { t, _ } = useTranslation();
  return (
    <AmenitiesSection>
      <Title> {t("amenities")}</Title>
      {amenitiesList.map(amenitie => (
        <AmenitiesContainer>
          <AmenitiesLogo src={amenitie.logo} />
          <AmenitiesLabel> {t(amenitie.translation)} </AmenitiesLabel>
          <AvaliabilityLogo src={amenities[amenitie.name] ? sucess : error} />
        </AmenitiesContainer>
      ))}
    </AmenitiesSection>
  );
};
