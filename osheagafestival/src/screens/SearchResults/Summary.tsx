import React from "react";
import styled from "styled-components";

import { greyDark, primary } from "../../assets/Colors";
import * as S from "./../../styledComponents";

const Summary: React.FC = () => (
  <Container>
    <S.Card>
      <Information>
        Your trip from <City>NYC</City> > <City>MTL</City> - August 2nd, 2020
      </Information>
      <People> 1 Adult </People>
    </S.Card>
  </Container>
);

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
