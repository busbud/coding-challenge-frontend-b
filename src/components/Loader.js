import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { Translate } from 'react-redux-i18n';

const Loader = props => (
  <div className="loaderWrapper p-2">
    <Spinner
      animation="border"
      role="status"
      {...props}
    >
      <span className="sr-only"><Translate value="application.loading" /></span>
    </Spinner>
  </div>
);

export default Loader;
