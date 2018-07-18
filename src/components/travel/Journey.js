import React, { Component } from "react";
import PropTypes from "prop-types";
// Third party libraries
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
// Inner imports
import "./TravelList.css";

class Journey extends Component {
  render() {
    const { journey } = this.props;

    return (
      <Paper className="travel-list__paper">
        <Grid container wrap="nowrap" spacing={16}>
          <Grid item>
            <Avatar>W</Avatar>
          </Grid>
          <Grid item xs zeroMinWidth>
            <Typography noWrap>{journey.departureTime}</Typography>
          </Grid>
          <Grid item xs zeroMinWidth>
            <Typography noWrap>{journey.originLocation}</Typography>
          </Grid>
          <Grid item xs zeroMinWidth>
            <Typography noWrap>{journey.arrivalTime}</Typography>
          </Grid>
          <Grid item xs zeroMinWidth>
            <Typography noWrap>{journey.destinationLocation}</Typography>
          </Grid>
          <Grid item xs zeroMinWidth>
            <Typography noWrap>{journey.prices}</Typography>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}
export const JourneyPropTypes = PropTypes.shape({
  id: PropTypes.string.isRequired,
  departureTime: PropTypes.string.isRequired,
  originLocation: PropTypes.string.isRequired,
  arrivalTime: PropTypes.string.isRequired,
  destinationLocation: PropTypes.string.isRequired,
  prices: PropTypes.number.isRequired
});

Journey.propTypes = {
  journey: JourneyPropTypes.isRequired
};

export default Journey;
