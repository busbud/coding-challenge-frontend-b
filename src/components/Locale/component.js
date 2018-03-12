import React from 'react';
import { string, func } from 'prop-types';
import { MenuItem } from 'material-ui/Menu';

const propTypes = {
  code: string.isRequired,
  onClick: func.isRequired,
};

const Component = ({ code, onClick }) => (
  <MenuItem key={code} onClick={() => onClick(code)}>
    {code}
  </MenuItem>
);

Component.propTypes = propTypes;

export default Component;
