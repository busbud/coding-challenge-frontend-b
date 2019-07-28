import PropTypes from "prop-types";

import { colours, fonts } from "../theme";

const Button = props => (
  <button className={"block" in props && "block"}>
    {props.children}
    <style jsx>{`
      button {
        background-color: ${colours.red};
        border: 1px solid ${colours.red};
        border-radius: 40px;
        color: white;
        cursor: pointer;
        font-family: ${fonts.slab};
        font-size: 18px;
        padding: 14px 30px;
        text-transform: uppercase;
      }
      button:hover {
        background-color: ${colours.redDark};
        border-color: ${colours.redDark};
      }
      .block {
        width: 100%;
      }
    `}</style>
  </button>
);

Button.propTypes = {
  children: PropTypes.node,
  block: PropTypes.bool
};

export default Button;
