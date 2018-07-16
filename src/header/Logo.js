import React from "react";
// Third party libraries
import Translate from "react-translate-component";
import Typography from "@material-ui/core/Typography";
// Inner imports
import "./Logo.css";
import logo from "./img/oshega_xs.png";

const Logo = () => (
  <div className="logo--inline">
    <Typography variant="title" color="inherit">
      <Translate content="header.logo.text_before" />
    </Typography>
    <img className="logo__img" src={logo} alt="Oshega logo" />
  </div>
);

export default Logo;
