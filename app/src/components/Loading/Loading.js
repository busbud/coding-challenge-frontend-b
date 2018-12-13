import React, { Fragment } from "react";

import { withDepartures } from "../../hoc/withDepartures";

import "./Loading.scss";

const Loading = ({ isLoading, error }) => (
  <Fragment>
    {isLoading && (
      <div class="loading">
        <p>Loading...</p>
      </div>
    )}

    {error && (
      <div class="error">
        <p>The service is temporarily unavailable</p>
      </div>
    )}
  </Fragment>
);

export default withDepartures(Loading);
