// @flow

import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import { Add, Remove } from '@material-ui/icons';
import type { Sign } from './types';
import styles from './TravelerCountSelector.css';
import { computeTravellerCount } from './helpers';

type Props = {|
  onChange: (value: number) => void,
|};

type State = {|
  travellerCount: number,
|};

export class TravelerCountSelector extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      travellerCount: 0,
    };
  }

  onAddTraveller = (sign: Sign) => {
    const { travellerCount } = this.state;
    const { onChange } = this.props;
    const newTravellerCount = computeTravellerCount(sign, travellerCount);
    this.setState({
      travellerCount: newTravellerCount,
    });
    onChange(newTravellerCount);
  };

  render() {
    return (
      <div>
        <TextField
          id="outlined-adornment-password"
          variant="outlined"
          label="Password"
          InputProps={{
            shrink: true,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={() => this.onAddTraveller('-')}
                >
                  <Remove />
                </IconButton>
              </InputAdornment>
            ),
            startAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={() => this.onAddTraveller('+')}
                >
                  <Add />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
    );
  }
}
