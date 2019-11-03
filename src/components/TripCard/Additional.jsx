import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import star from "../../assets/class.png";
import seat from "../../assets/seat.png";
import direct from "../../assets/switch.png";
import ticket from "../../assets/ticket.png";
import timeIcon from "../../assets/time.png";
import moment from "moment";
import sucess from "../../assets/success.svg";
import error from "../../assets/error.svg";

const AdditionalContainer = styled.div`
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
const Title = styled.span`
  text-align: center;
  margin-bottom: 10px;
  color: #50c4c9;
  font-weight: bold;
`;

const Label = styled.span`
  font-size: 14px;
`;
const Data = styled.span`
    font-size: 14px;
    color: #50c4c9
    font-weight: bold;
`;
const Icon = styled.img`
  width: 25px;
`;
const SubContainer = styled.div`
  flex: 1;
  display: flex;
  padding: 10px;
  align-items: center;
  justify-content: space-between;
`;

export const AdditionalInformation = props => {
  const { available_seats, duration, has_transfers, ticket_types } = props;
  const { t, i18n } = useTranslation();
  console.log(ticket_types);
  return (
    <AdditionalContainer>
      <Title> {t("additionalInfo")}</Title>
      <SubContainer>
        <Icon src={timeIcon} />
        <Label>{t("duration")}</Label>
        <Data>{moment(duration).format("hh:mm")}</Data>
      </SubContainer>
      <SubContainer>
        <Icon src={star} />
        <Label>{t("class")}</Label>
        <Data>{props.class}</Data>
      </SubContainer>
      <SubContainer>
        <Icon src={seat} />
        <Label>{t("avaliableSeat")}</Label>
        <Data>{available_seats}</Data>
      </SubContainer>
      <SubContainer>
        <Icon src={direct} />
        <Label>{t("direct")}</Label>
        <Icon src={has_transfers ? error : sucess} />
      </SubContainer>
      <SubContainer>
        <Icon src={ticket} />
        <Label>{t("eTicket")}</Label>
        <Icon src={ticket_types[0] !== "print" ? error : sucess} />
      </SubContainer>
    </AdditionalContainer>
  );
};
