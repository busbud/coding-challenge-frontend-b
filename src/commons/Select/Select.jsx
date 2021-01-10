import React from "react";
import PropTypes from "prop-types";

import { StyledSelect } from "./styles";

const { Option } = StyledSelect;

const Select = ({ children, ...otherProps }) => (
  <StyledSelect {...otherProps}>{children}</StyledSelect>
);

Select.Option = Option;

Select.propTypes = {
  /**
   * Any React of DOM children node element.
   */
  children: PropTypes.any.isRequired,
};

export default Select;
