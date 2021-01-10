import React from "react";
import PropTypes from "prop-types";

import { StyledContainer } from "./styles";

export const Container = ({ children }) => (
  <StyledContainer>{children}</StyledContainer>
);

Container.propTypes = {
  /**
   * Any React of DOM children node element.
   */
  children: PropTypes.any.isRequired,
};

export default Container;
