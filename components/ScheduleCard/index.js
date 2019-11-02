import React, { useContext, useState } from "react";
import styled from "styled-components";

import { IntlContext } from "../../pages/_app";
import { getTransaltion } from "../../utils/translation";
import Arrow from "../Arrow";
import {
  Row,
  Column,
  ColumnGrow
} from "../../components/common-styled/Containers";
import { BoldText, NormalText } from "../../components/common-styled/Texts";

const Wrapper = styled(Column)`
  border: 1px solid #ccc;
  padding: 16px;
  border-radius: 5px;
  flex-direction: column;
  margin: 10px 0;
`;
const Box = styled(Column)`
  align-items: center;
  justify-content: center;
  padding: 20px 40px;
  border-radius: 10px;
  border: 1px solid #ccc;
`;
const ColumnBordered = styled(ColumnGrow)`
  border-right: 1px solid #ccc;
  margin-right: 20px;
`;
const TopRow = styled(Row)`
  align-items: center;
  margin-bottom: 15px;
`;
const BottomRow = styled(Row)`
  align-items: center;
`;
const City = styled.div`
  color: gray;
  margin-top: 5px;
`;
const OperatorLogo = styled.img``;
const OperatorName = styled.div`
  margin-left: 10px;
`;
const Price = styled(BoldText)`
  margin: 0 10px 0 auto;
`;
const Book = styled.button`
  background: #065af3;
  border-radius: 96px;
  color: #fff;
  font-size: 14px;
  padding: 10px 20px;
  text-align: center;
  outline: none;
  cursor: pointer;
`;
const Date = styled.div`
  margin-left: 10px;
  border-left: 1px solid #9e9a9a;
  padding-left: 10px;
`;
const ArrowSpaced = styled(Arrow)`
  margin: 15px 30px;
`;
const DetailsArrow = styled(Arrow)`
  margin: -1px 0 0 10px;
`;
const Details = styled.a`
  margin: auto 0 0 auto;
  display: flex;
  align-items: center;
  color: #1da1f2;
  cursor: pointer;
`;
const Expandable = styled(Row)`
  ${props => (props.isOpen ? "max-height:1000px;" : "max-height:0;")}
  transition: max-height 0.3s ease-out;
  margin-top: 10px;
  overflow: hidden;
`;
const ExtrasWrap = styled(Row)`
  padding: 10px;
  border: 1px solid #ccc;
  flex-grow: 1;
  border-radius: 5px;
`;
const GrayText = styled(NormalText)`
  color: #ccc;
`;

export default function ScheduleCard(props) {
  const { toggleLanguage } = useContext(IntlContext);
  const { schedule } = props;
  const [isOpen, setOpen] = useState(false);
  return (
    <Wrapper>
      <TopRow>
        <OperatorLogo src="https://busbud.imgix.net/operator-logos/logo_trailways.png?h={height}&w={width}&auto=format&fit=fill&bg=0FFF"></OperatorLogo>
        <OperatorName>Adirondack Trailways</OperatorName>
        <Date>20th Nov 2019</Date>
        <Price>$78.50</Price>
        <Book>BOOK NOW</Book>
      </TopRow>
      <BottomRow>
        <Box>
          <BoldText>9.30</BoldText>
          <City>Newyork</City>
        </Box>
        <ArrowSpaced dotted direction={"right"} text={"8hrs 55mins"} />
        <Box>
          <BoldText>11.30</BoldText>
          <City>Montreal</City>
        </Box>
        <Details onClick={() => setOpen(!isOpen)}>
          Bus details
          <DetailsArrow direction={"down"} />
        </Details>
      </BottomRow>
      <Expandable isOpen={isOpen}>
        <ExtrasWrap>
          <ColumnBordered>
            <BoldText>Amentiies</BoldText>
            <GrayText>Air conditioning</GrayText>
            <GrayText>Air conditioning</GrayText>
            <GrayText>Air conditioning</GrayText>
            <GrayText>Air conditioning</GrayText>
          </ColumnBordered>
          <ColumnGrow>
            <BoldText>Terms</BoldText>
            <GrayText>Air conditioning</GrayText>
            <GrayText>Air conditioning</GrayText>
            <GrayText>Air conditioning</GrayText>
            <GrayText>Air conditioning</GrayText>
          </ColumnGrow>
        </ExtrasWrap>
      </Expandable>
    </Wrapper>
  );
}
