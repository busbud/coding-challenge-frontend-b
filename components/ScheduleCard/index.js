import React, { useContext } from "react";
import styled from "styled-components";

import { IntlContext } from "../../pages/_app";
import { getTransaltion } from "../../utils/translation";

const Wrapper = styled.div``;
const InnerWrapper = styled.div``;
const Title = styled.h1`
  font-size: 50px;
  margin: 0;
  color: ${({ theme }) => theme.text.black};
`;

export default function ScheduleCard(props) {
  const { toggleLanguage } = useContext(IntlContext);
  const { schedule } = props;
  return (
    <Wrapper>
      <InnerWrapper>
        <Title>{schedule.departure_time}</Title>
      </InnerWrapper>
    </Wrapper>
  );
}
