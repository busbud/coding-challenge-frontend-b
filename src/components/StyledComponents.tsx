import { Link } from "@reach/router";
import styled from "styled-components";

import { white } from "./../assets/Colors";
import { xsm, reg } from "./../assets/Spacing";

export const Card = styled.div`
  background-color: ${white};
  padding: ${reg};
  border-radius: ${xsm};
  display: flex;
  flex-direction: column;
`;

export const WhiteLink = styled(Link)`
  text-decoration: none;
  font-weight: 300;
  color: ${white};
  &[visited] {
    color: ${white};
  }
`;

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
`;
