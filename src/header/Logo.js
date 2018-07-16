import React from "react";
import Typography from "@material-ui/core/Typography";

import "./Logo.css";

import logo from "./img/oshega_xs.png";

const Logo = () => (
  <div className="logo--inline">
    <Typography variant="title" color="inherit">
      Travel to
    </Typography>
    <img className="logo__img" src={logo} alt="Oshega logo" />
  </div>
);

export default Logo;
