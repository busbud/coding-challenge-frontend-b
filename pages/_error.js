import React from "react";
import PropTypes from "prop-types";

import { withTranslation } from "../i18n";

class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { namespacesRequired: ["common"], statusCode };
  }

  render() {
    return (
      <p>
        {this.props.statusCode
          ? `An error ${this.props.statusCode} occurred on server`
          : "An error occurred on client"}
      </p>
    );
  }
}

Error.propTypes = {
  statusCode: PropTypes.number
};

export default withTranslation("common")(Error);
