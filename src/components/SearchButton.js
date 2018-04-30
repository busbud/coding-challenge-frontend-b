import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

const styles = {
  label: {
    fontSize: '1.3em',
    fontWeight: 'lighter',
    color: 'DarkSlateGrey',
  },
};

const SearchButton = ({ classes: { label }, ...rest }) => {
  return (
    <Button classes={{ label }} {...rest}>
      Search Now
    </Button>
  );
};

SearchButton.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(SearchButton);
