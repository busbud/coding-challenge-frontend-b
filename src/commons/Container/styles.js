import styled from "styled-components";

import { BREAKPOINTS } from "utils/constants";

export const StyledContainer = styled.div`
  width: 100%;
  padding: 0 16px;

  @media screen and (min-width: ${BREAKPOINTS.tablet}) {
    width: 980px;
    padding: 0;
    margin: 0 auto;
  }
`;
