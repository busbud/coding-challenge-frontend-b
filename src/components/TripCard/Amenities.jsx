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

const AmenitiesContainer = styled.div`
  flex: 1;
  display: flex;
  padding: 10px;
  align-items: center;
`;

const Title = styled.span`
  text-align: center;
`;
export const Amenities = ({ amenities }) => {
  const { t, i18n } = useTranslation();
  console.log("amenities", amenities);
  return (
    <AmenitiesSection>
      <Title> {t("amenities")}</Title>
      <AmenitiesContainer>
        <AmenitiesLogo src={ac} />
        <AmenitiesLabel> {t("ac")} </AmenitiesLabel>
        <AvaliabilityLogo src={amenities.ac ? sucess : error} />
      </AmenitiesContainer>
      <AmenitiesContainer>
        <AmenitiesLogo src={tv} />
        <AmenitiesLabel> {t("tv")} </AmenitiesLabel>
        <AvaliabilityLogo src={amenities.tv ? sucess : error} />
      </AmenitiesContainer>
      <AmenitiesContainer>
        <AmenitiesLogo src={toilet} />
        <AmenitiesLabel>{t("toilet")} </AmenitiesLabel>
        <AvaliabilityLogo src={amenities.toilet ? sucess : error} />
      </AmenitiesContainer>
      <AmenitiesContainer>
        <AmenitiesLogo src={seat} />
        <AmenitiesLabel> {t("legRoom")} </AmenitiesLabel>
        <AvaliabilityLogo src={amenities.leg_room ? sucess : error} />
      </AmenitiesContainer>
      <AmenitiesContainer>
        <AmenitiesLogo src={plug} />
        <AmenitiesLabel> {t("power")} </AmenitiesLabel>
        <AvaliabilityLogo src={amenities.power_outlets ? sucess : error} />
      </AmenitiesContainer>
      <AmenitiesContainer>
        <AmenitiesLogo src={wifi} />
        <AmenitiesLabel> {t("wifi")} </AmenitiesLabel>
        <AvaliabilityLogo src={amenities.wifi ? sucess : error} />
      </AmenitiesContainer>
      <AmenitiesContainer>
        <AmenitiesLogo src={fork} />
        <AmenitiesLabel> {t("food")}</AmenitiesLabel>
        <AvaliabilityLogo src={amenities.food ? sucess : error} />
      </AmenitiesContainer>
    </AmenitiesSection>
  );
};
