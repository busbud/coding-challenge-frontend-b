import styled from "styled-components";

import { BREAKPOINTS } from "utils/constants";

export const Form = styled.div`
  background-color: var(--white);
  border-radius: 4px;
  margin-top: 16px;
  padding: 16px;

  @media screen and (min-width: ${BREAKPOINTS.tablet}) {
    align-items: center;
    display: flex;
    padding: 12px 16px;
  }
`;

export const FormControl = styled.div`
  &:not(:last-of-type) {
    margin-bottom: 16px;
  }

  @media screen and (min-width: ${BREAKPOINTS.tablet}) {
    flex: 1;
    margin-bottom: 0;

    &:not(:last-of-type) {
      margin-right: 16px;
      margin-bottom: 0;
    }
  }
`;
