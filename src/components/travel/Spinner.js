import React, { Component } from "react";
// Third party libraries
import IconRefresh from "@material-ui/icons/Refresh";

// Inner imports
import "./Spinner.css";

class Spinner extends Component {
  render() {
    return (
      <IconRefresh style={{ fontSize: 50 }} className="spinner--rotating" />
    );
  }
}
export default Spinner;
