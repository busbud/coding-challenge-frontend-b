import React from 'react';
import { func, object, bool, instanceOf } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { InputAdornment } from 'material-ui/Input';
import SearchIcon from 'material-ui-icons/Search';
import FlightTakeoffIcon from 'material-ui-icons/FlightTakeoff';
import FlightLandIcon from 'material-ui-icons/FlightLand';
import DateRangeIcon from 'material-ui-icons/DateRange';
import { CircularProgress } from 'material-ui/Progress';
import { DatePicker } from 'material-ui-pickers';
import messages from './messages';
import Grid from 'material-ui/Grid';

const propTypes = {
  classes: object.isRequired,
  onSubmit: func.isRequired,
  onChange: func.isRequired,
  outbound_date: instanceOf(Date).isRequired,
  isFetching: bool.isRequired,
};

const Component = ({ classes, outbound_date, onChange, onSubmit, isFetching }) => (
  <form onSubmit={onSubmit}>
    <Grid container justify="center">
      <Grid item md xs={12}>
        <TextField
          id="origin"
          className={classes.textField}
          label={<FormattedMessage {...messages.origin_label} />}
          defaultValue="New York"
          InputProps={{
            readOnly: true,
            startAdornment: (
              <InputAdornment position="start">
                <FlightTakeoffIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item md xs={12}>
        <TextField
          id="destination"
          className={classes.textField}
          label={<FormattedMessage {...messages.destination_label} />}
          defaultValue="Montreal"
          InputProps={{
            readOnly: true,
            startAdornment: (
              <InputAdornment position="start">
                <FlightLandIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>

      <Grid item md xs={12}>
        <DatePicker
          id="outbound_date"
          className={classes.textField}
          label={<FormattedMessage {...messages.outbound_date_label} />}
          value={outbound_date}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <DateRangeIcon />
              </InputAdornment>
            ),
          }}
          onChange={onChange}
          disablePast
        />
      </Grid>

      <div className={classes.button_wrapper}>
        <Button type="submit" variant="fab" className={classes.button} color="primary" aria-label="search">
          <SearchIcon />
        </Button>
        {isFetching && <CircularProgress className={classes.circularProgress} size={72} />}
      </div>
    </Grid>
  </form>
);

Component.propTypes = propTypes;

export default Component;
