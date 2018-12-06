import React, { Fragment } from "react";

import "./Loading.scss";

const Loading = ({ isLoading, error }) => (
  <Fragment>
    {isLoading && (
      <div id="loading">
        <p>Chargement...</p>
      </div>
    )}

    {error && (
      <div id="error">
        <p>Le service est momentanément indisponible</p>
      </div>
    )}
  </Fragment>
);

export default Loading;
