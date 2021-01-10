import styled from "styled-components";

import { BREAKPOINTS } from "utils/constants";

export const DeparturesWrapper = styled.div`
  padding-bottom: 48px;
`;

export const OperatorImage = styled.img`
  width: 150px;
  display: block;
  height: auto;
`;

export const Box = styled.div`
  width: 100%;
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.24);
  overflow: hidden;

  &:not(:last-of-type) {
    margin-bottom: 32px;
  }

  @media screen and (min-width: ${BREAKPOINTS.mobile}) {
    align-items: center;
    display: flex;
  }

  @media screen and (min-width: ${BREAKPOINTS.tablet}) {
    border-radius: none;
    box-shadow: none;
    overflow: initial;

    & > div:not(:last-of-type) {
      margin-right: 40px;
    }
  }
`;

export const CityBox = styled.div`
  height: 150px;
  align-items: center;
  background-color: var(--white);
  background-image: url(${({ image_url }) => `${image_url}`});
  background-position: center;
  background-size: cover;
  flex: 1;
  position: relative;
  padding: ${({ loading }) => (loading ? "8px" : "0px")};

  @media screen and (min-width: ${BREAKPOINTS.tablet}) {
    border-radius: 4px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.24);

    &:after {
      width: 24px;
      border-top: 4px var(--black) dotted;
      content: "";
      display: block;
      position: absolute;
      opacity: 0.2;
      top: 50%;
      right: -32px;
    }
  }
`;

export const CityBoxOverlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--black);
  border-radius: 4px;
  display: block;
  position: absolute;
  opacity: 0.3;
  top: 0;
  left: 0;
  z-index: 1;

  @media screen and (min-width: ${BREAKPOINTS.tablet}) {
    border-radius: 4px;
  }
`;

export const CityBoxContent = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  position: relative;
  z-index: 2;
  padding: 16px;
`;

export const CityBoxTitle = styled.h3`
  color: var(--white);
  font-size: 16px;
  font-weight: 700;
`;

export const CityBoxTime = styled.span`
  color: var(--white);
  display: block;
  font-size: 18px;
  font-weight: 900;
`;

export const CityBoxName = styled.span`
  background-color: var(--white);
  color: var(--black);
  font-size: 14px;
  font-weight: 900;
  padding: 2px 4px;
`;

export const OperatorBox = styled.div`
  height: 150px;
  align-items: center;
  background-color: var(--white);
  display: ${({ loading }) => (loading ? "block" : "flex")};
  justify-content: space-evenly;
  flex-direction: column;
  flex: 1;
  padding: ${({ loading }) => (loading ? "8px" : "16px")};

  @media screen and (min-width: ${BREAKPOINTS.tablet}) {
    border-radius: 4px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.24);
  }
`;

export const OperatorPrice = styled.span`
  color: var(--blue);
  font-size: 18px;
  font-weight: 700;
`;
