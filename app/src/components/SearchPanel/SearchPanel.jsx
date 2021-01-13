import React from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import withStyles from "@material-ui/core/styles/withStyles";

import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconLocationOn from "@material-ui/icons/LocationOn";
import IconMyLocation from "@material-ui/icons/MyLocation";
import IconDateRange from "@material-ui/icons/DateRange";
import IconPerson from "@material-ui/icons/Person";

import searchPanelStyle from "../../assets/jss/components/searchPanelStyle";

function SearchPanel(props) {
  const { classes, origin, destination, dateOut, passengers } = props;

  const labelOrigin = props.intl.formatMessage({ id: "origin" });
  const labelDestination = props.intl.formatMessage({ id: "destination" });
  const labelDate = props.intl.formatMessage({ id: "date" });
  const labelPax = props.intl.formatMessage({ id: "passenger" });

  return (
    <form className={classes.form}>
      <TextField
        className={classes.input}
        id="origin"
        label={labelOrigin}
        variant="outlined"
        value={origin}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconLocationOn />
            </InputAdornment>
          ),
          readOnly: true,
        }}
      />
      <TextField
        className={classes.input}
        id="destination"
        label={labelDestination}
        variant="outlined"
        value={destination}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconMyLocation />
            </InputAdornment>
          ),
          readOnly: true,
        }}
      />
      <TextField
        className={classes.input}
        id="outDate"
        label={labelDate}
        variant="outlined"
        value={dateOut}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconDateRange />
            </InputAdornment>
          ),
          readOnly: true,
        }}
      />
      <TextField
        className={classes.input}
        id="passengers"
        label={labelPax}
        variant="outlined"
        value={passengers}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconPerson />
            </InputAdornment>
          ),
          readOnly: true,
        }}
      />
    </form>
  );
}

SearchPanel.defaultProps = {
  origin: "Québec",
  destination: "Montréal",
  dateOut: new Date(Date.now()).toISOString().substring(0, 10),
  passengers: 1,
};

SearchPanel.propTypes = {
  origin: PropTypes.string,
  destination: PropTypes.string,
  dateOut: PropTypes.string,
  passengers: PropTypes.number,
};

export default injectIntl(withStyles(searchPanelStyle)(SearchPanel));
