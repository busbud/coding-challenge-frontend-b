import React from "react";
import PropTypes from "prop-types";

import { StyledButton } from "./style";

const Button = ({ children, onClick, type, color, ...otherProps }) => (
  <StyledButton type={type} color={color} {...otherProps} onClick={onClick}>
    {children}
  </StyledButton>
);

Button.propTypes = {
  /**
   * Any React of DOM children node element.
   */
  children: PropTypes.any.isRequired,
  /**
   * The onClick event.
   */
  onClick: PropTypes.func.isRequired,
  /**
   * Button type.
   */
  type: PropTypes.oneOf(["submit", "button"]),
  /**
   * A group of color themes.
   */
  color: PropTypes.oneOf(["default", "primary"]),
};

Button.defaultProps = {
  type: "button",
  color: "default",
};

export default Button;
