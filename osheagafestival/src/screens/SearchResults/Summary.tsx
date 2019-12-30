import React from "react";
import styled from "styled-components";
import { FormattedMessage, useIntl } from "react-intl";

import { greyDark, primary } from "../../assets/Colors";
import * as S from "./../../styledComponents";

const Summary: React.FC = () => {
  const intl = useIntl();

  return (
    <Container>
      <S.Card>
        <Information>
          <FormattedMessage
            id="trip.description"
            defaultMessage="Your trip from <city>NYC</city> to <city>MTL</city> - {date}"
            values={{
              city: (...elt: Array<HTMLElement>) => <City>{elt}</City>,
              date: intl.formatDate(new Date(2020, 7, 2), {
                year: "numeric",
                month: "long",
                day: "2-digit"
              })
            }}
            description="Trip Search Information"
          />
        </Information>
        <People>
          <FormattedMessage
            id="trip.travelers"
            values={{
              travelersCount: 1
            }}
            description="Trip Travelers Count Information"
          />
        </People>
      </S.Card>
    </Container>
  );
};

const People = styled.div`
  font-weight: 300;
  color: ${greyDark};
  text-align: center;
`;

const City = styled.span`
  color: ${primary};
  font-weight: 600;
`;

const Information = styled.div`
  font-size: 1.2em;
  font-weight: 300;
  text-align: center;
`;

const Container = styled.div`
  background-image: url("https://www.osheaga.com/uploads/osheaga/backgrounds/Osheaga-homecoming.jpb.jpg?v=67a753a108ff7d65f3d9355c44518fdf");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
`;

export default Summary;
