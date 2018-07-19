import React from "react";
import PropTypes from "prop-types";
// Third party libraries
import counterpart from "counterpart";
import Typography from "@material-ui/core/Typography";
import Translate from "react-translate-component";
// Inner imports
import "./Introduction.css";

const Introduction = ({ logo, text }) => (
  <div className="travel__container">
    <img
      className={`travel__logo ${logo.className}`}
      src={logo.src}
      alt={counterpart.translate(logo.alt)}
    />
    <Typography className="travel__description">
      <Translate content={text} />
    </Typography>
  </div>
);

Introduction.propTypes = {
  logo: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    className: PropTypes.string
  }),
  text: PropTypes.string.isRequired
};

export default Introduction;
