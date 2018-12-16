// @flow

import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import { Add, Remove } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import type { Sign } from './types';
import { computeTravellerCount } from './helpers';

type TravellerType = 'children' | 'adult' | 'senior';

type Classes = {|
  input: string,
|};
type Props = {|
  onChange: (value: any) => {| travellerCount: number, travellerType: TravellerType |},
  travellerType: TravellerType,
  classes: Classes,
  isErrored: boolean,
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
    const { onChange, travellerType } = this.props;
    const newTravellerCount = computeTravellerCount(sign, travellerCount);
    this.setState({
      travellerCount: newTravellerCount,
    });
    onChange({ travellerCount: newTravellerCount, travellerType });
  };

  render() {
    const { travellerCount } = this.state;
    const { classes, travellerType, isErrored } = this.props;

    return (
      <TextField
        variant="outlined"
        error={isErrored}
        value={travellerCount}
        type="number"
        InputProps={{
          shrink: true,
          className: classes.input,
          startAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="Increase traveller Count"
                onClick={() => this.handleIncrementTravellerCount('+')}
              >
                <Add />
              </IconButton>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              {travellerType}
              <IconButton
                aria-label="deacrese traveller Count"
                onClick={() => this.handleIncrementTravellerCount('-')}
              >
                <Remove />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    );
  }
}

export const TravelerCountSelector = withStyles(styles)(UnstyledTravellerCountSelector);
