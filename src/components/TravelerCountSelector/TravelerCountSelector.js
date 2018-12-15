// @flow

import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import { Add, Remove } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import type { Sign } from './types';
import { computeTravellerCount } from './helpers';

type Classes = {|
  input: string,
|};
type Props = {|
  onChange: (value: number) => void,
  label: string,
  classes: Classes,
|};

type State = {|
  travellerCount: number,
|};

type Styles = {|
  input: {|
    textAlign: string,
  |},
|};

const styles: Styles = {
  input: {
    textAlign: 'center',
  },
};

class UnstyledTravellerCountSelector extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      travellerCount: 0,
    };
  }

  handleIncrementTravellerCount = (sign: Sign) => {
    const { travellerCount } = this.state;
    const { onChange } = this.props;
    const newTravellerCount = computeTravellerCount(sign, travellerCount);
    this.setState({
      travellerCount: newTravellerCount,
    });
    onChange(newTravellerCount);
  };

  render() {
    const { travellerCount } = this.state;
    const { label, classes } = this.props;

    return (
      <TextField
        variant="outlined"
        label={label}
        value={travellerCount}
        type="number"
        InputProps={{
          shrink: true,
          className: classes.input,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="Toggle password visibility"
                onClick={() => this.handleIncrementTravellerCount('-')}
              >
                <Remove />
              </IconButton>
            </InputAdornment>
          ),
          startAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="Toggle password visibility"
                onClick={() => this.handleIncrementTravellerCount('+')}
              >
                <Add />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    );
  }
}

export const TravelerCountSelector = withStyles(styles)(UnstyledTravellerCountSelector);
