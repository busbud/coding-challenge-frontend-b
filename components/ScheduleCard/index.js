import React, { useContext, useState } from "react";
import styled from "styled-components";

import { IntlContext } from "../../pages/_app";
import { getTransaltion } from "../../utils/translation";
import { formatedDate, formatedTime, findDifference } from "../../utils/date";
import Arrow from "../Arrow";
import { Row, Column } from "../../components/common-styled/Containers";
import { BoldText, NormalText } from "../../components/common-styled/Texts";
import { media } from "../common-styled/device";

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
  ${media.mobile`
    ${props => props.alignEnd && "align-self: flex-end;"}
  `}
`;
const TopRow = styled(Row)`
  ${media.mobile`flex-direction: column;`}
`;
const BottomRow = styled(Row)`
  ${media.mobile`
    flex-direction: column;
    align-items: flex-start;
  `}
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
  ${media.mobile`margin: 0;`}
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
  ${media.mobile`margin: 0 0 0 auto;`}
`;
const Date = styled.div`
  margin-left: 10px;
  border-left: 1px solid #9e9a9a;
  padding-left: 10px;
  ${media.mobile`display: none;`}
`;
const ArrowSpaced = styled(Arrow)`
  margin: 15px 30px;
  ${media.mobile`align-self: center;`}
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
  ${media.mobile`margin: 16px 0 0 auto;`}
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
const Amenities = styled(Row)`
  margin: 15px 0 0 -10px;
  flex-wrap: wrap;
`;
const Amenity = styled(Book)`
  margin: 0 10px;
  ${media.desktop`
    margin: 0 0 10px 10px;
  `}
`;
const MobileSection = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  margin-bottom: 16px;
`;

export default function ScheduleCard(props) {
  const { language } = useContext(IntlContext);
  const { schedule, operator = {}, origin = {}, destination = {} } = props;
  const [isOpen, setOpen] = useState(false);
  const { mins, hrs } = findDifference(
    schedule.departure_time,
    schedule.arrival_time
  );
  return (
    <Wrapper key={schedule.id}>
      <TopRow>
        <MobileSection>
          <OperatorLogo
            alt={operator.display_name}
            src={operator.logo_url}
          ></OperatorLogo>
          <OperatorName data-testid="scard-operator">
            {operator.display_name}
          </OperatorName>
          <Date data-testid="scard-departure-date">
            {formatedDate(schedule.departure_time)}
          </Date>
        </MobileSection>
        <MobileSection>
          <Price data-testid="scard-price">
            {schedule.prices.currency +
              " " +
              (schedule.prices.total / 100).toFixed(2)}
          </Price>
          <Book>BOOK NOW</Book>
        </MobileSection>
      </TopRow>
      <BottomRow>
        <Box>
          <BoldText data-testid="scard-departure">
            {formatedTime(schedule.departure_time)}
          </BoldText>
          <City>{origin.name}</City>
        </Box>
        <ArrowSpaced
          dotted
          direction={"right"}
          text={(hrs && hrs + "hrs ") + (mins && mins + "mins")}
          bottomText={hrs > 24 && "+1 day"}
        />
        <Box alignEnd>
          <BoldText>{formatedTime(schedule.arrival_time)}</BoldText>
          <City>{destination.name}</City>
        </Box>
        <Details
          data-testid="scard-show-details"
          onClick={() => setOpen(!isOpen)}
        >
          {getTransaltion("sc.bus_details", language)}
          <DetailsArrow direction={"down"} />
        </Details>
      </BottomRow>
      {/* only render if isOpen true */}
      {isOpen && (
        <Expandable isOpen={isOpen}>
          <ExtrasWrap>
            <Column>
              <BoldText data-testid="scard-amenities">
                {getTransaltion("amenities", language)}
              </BoldText>
              <Amenities>
                {Object.keys(schedule.amenities).map((amenity, index) => {
                  return (
                    schedule.amenities[amenity] &&
                    getTransaltion("amenities." + amenity, language) && (
                      <Amenity key={index + "amenity"}>
                        {getTransaltion("amenities." + amenity, language)}
                      </Amenity>
                    )
                  );
                })}
              </Amenities>
            </Column>
          </ExtrasWrap>
        </Expandable>
      )}
    </Wrapper>
  );
}
