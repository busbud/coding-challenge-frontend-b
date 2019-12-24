import * as React from "react";
import { RouteComponentProps } from "@reach/router";
import styled from "styled-components";

import * as S from "./../../styledComponents";
import { reg } from "./../../assets/Spacing";

const Search: React.FC<RouteComponentProps> = () => {
  return (
    <Background>
      <S.Card>
        Going to Montréal from NYC ? Check out the departures !
        <Button className="pure-button pure-button-primary" href="#">
          <S.WhiteLink to="search">search departures</S.WhiteLink>
        </Button>
      </S.Card>
    </Background>
  );
};

const Background = styled.div`
  background-image: url("https://www.osheaga.com/uploads/osheaga/backgrounds/Osheaga-homecoming.jpb.jpg?v=67a753a108ff7d65f3d9355c44518fdf");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.a`
  margin-top: ${reg};
  align-self: center;
`;

export default Search;
