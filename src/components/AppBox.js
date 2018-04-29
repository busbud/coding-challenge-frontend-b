import React from 'react';
import PropTypes from 'prop-types';
import Card from 'material-ui/Card';

const AppBox = ({ children }) => {
  return (
    <div className="App">
      <Card className="App-card">
        {children}
      </Card>
    </div>
  );
};

AppBox.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]).isRequired,
};

export default AppBox;
