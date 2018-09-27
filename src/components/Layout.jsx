import React from 'react';
import PropTypes from 'prop-types';

import './styles/Layout.scss';

function Layout({ children }) {
  return (
    <div className="Layout">
      {children}
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};

Layout.defaultProps = {
  children: null,
};

export default Layout;
