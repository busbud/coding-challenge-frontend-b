import styled from "styled-components";
import { rgba } from "polished";

import { Button } from "@/components";
import { breakpoints, colors } from "@/theme";
import { SearchResult } from "@/types";

interface Props {
  data: SearchResult;
}

const Wrap = styled.div`
  width: 840px;
  max-width: 100%;
  margin: 0 auto 20px;
  padding: 16px 24px;
  border-radius: 4px;
  background: ${colors.white};
  box-shadow: 0 2px 0 0 ${colors.lightAlt}, 0 4px 14px ${rgba(colors.grey, 0.2)};
`;

const Header = styled.header`
  display: flex;
`;

const RouteDetails = styled.div`
  padding-right: 20px;

  @media (min-width: ${breakpoints.tablet}) {
    display: flex;
  }
`;

const RouteDetailBlock = styled.div`
  @media (min-width: ${breakpoints.tablet}) {
    width: 220px;
  }
`;

const RouteTime = styled.div`
  font-size: 22px;
  font-weight: 600;

  @media (min-width: ${breakpoints.tablet}) {
    font-size: 32px;
  }
`;

const RouteTimeSuffix = styled.span`
  font-size: 16px;

  @media (min-width: ${breakpoints.tablet}) {
    font-size: 24px;
  }
`;

const RouteLocation = styled.div`
  text-transform: uppercase;
  font-size: 14px;
  color: ${colors.grey};
`;

const RouteBlockDivider = styled.span`
  display: inline-block;
  margin: 10px 0;
  font-size: 14px;
  opacity: 0.8;
  transform: rotate(90deg);

  @media (min-width: ${breakpoints.tablet}) {
    margin: 0 20px;
    align-self: center;
    transform: none;
  }
`;

const OperatorLogoWrap = styled.div`
  max-width: 150px;
  margin-left: auto;
  position: relative;
  top: -5px;
`;

const OperatorLogo = styled.img`
  max-width: 100%;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const Price = styled.strong`
  margin-left: auto;
  margin-right: 20px;
  font-size: 20px;
  font-weight: 700;
  color: ${colors.secondary};
`;

const split12HrString = (timeString: string) => {
  if (timeString.includes(" ")) {
    const [time, suffix] = timeString.split(" ");

    return (
      <>
        {time}
        <RouteTimeSuffix>{suffix}</RouteTimeSuffix>
      </>
    );
  }

  return timeString;
};

export const DepartureCard: React.FC<Props> = ({ data }) => (
  <Wrap>
    <Header>
      <RouteDetails>
        <RouteDetailBlock>
          <RouteTime>{split12HrString(data.departureTime)}</RouteTime>
          <RouteLocation>{data.from}</RouteLocation>
        </RouteDetailBlock>
        <RouteBlockDivider>→</RouteBlockDivider>
        <RouteDetailBlock>
          <RouteTime>{split12HrString(data.arrivalTime)}</RouteTime>
          <RouteLocation>{data.to}</RouteLocation>
        </RouteDetailBlock>
      </RouteDetails>

      <OperatorLogoWrap>
        <OperatorLogo src={data.operatorLogo} alt={data.operatorName} />
      </OperatorLogoWrap>
    </Header>

    <Footer>
      <Price>{data.price}</Price>

      <Button
        as="a"
        href={data.url}
        target="_blank"
        size="small"
        variant="primary"
      >
        Reserve
      </Button>
    </Footer>
  </Wrap>
);
