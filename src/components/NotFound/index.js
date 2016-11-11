import React from 'react';
import Link from 'react-router/Link';

const NotFound = () => (
  <div>
    <h1>We had trouble finding what you wanted...</h1>
    <Link to="/">Try going back home?</Link>
  </div>
);

export default NotFound;
