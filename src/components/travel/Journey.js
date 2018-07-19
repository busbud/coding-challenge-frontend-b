import React, { Component } from "react";
import PropTypes from "prop-types";
// Third party libraries
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Translate from "react-translate-component";
import {
  DirectionsBus as IconDirectionsBus,
  PlayArrow as IconPlayArrow,
  TransferWithinAStation as IconTransferWithinAStation
} from "@material-ui/icons";
import Moment from "react-moment";
import moment from "moment";
// Inner imports
import "./Journey.css";

class Journey extends Component {
  dateFormat = "YYYY-MM-DD";
  hourFormat = "HH:MM";

  render() {
    const { journey } = this.props;
    const departureDate = moment(journey.departureTime);
    const arrivalDate = moment(journey.arrivalTime);
    const sameDay = departureDate.dayOfYear() === arrivalDate.dayOfYear();

    return (
      <Paper className="journey__paper">
        <Grid container spacing={16} className="journey__info">
          <Grid item className="journey__avatar">
            <Avatar>
              <IconDirectionsBus />
            </Avatar>
          </Grid>
          <Grid item xs zeroMinWidth>
            <Grid
              container
              spacing={16}
              wrap="nowrap"
              justify="center"
              className="journey__info-up"
            >
              <Grid item className="journey__info-up-left">
                <Typography>{journey.originLocation}</Typography>
              </Grid>
              <Grid item className="journey__info-up-middle">
                <Paper elevation={2} className="journey__operator-logo">
                  <a
                    href={journey.operator.url}
                    target="_blank"
                    className={
                      !journey.operator.url
                        ? "journey__operators-link--disable"
                        : null
                    }
                  >
                    {journey.operator.logoUrl ? (
                      <img
                        alt={journey.operator.name}
                        src={journey.operator.logoUrl}
                        title={journey.operator.name}
                      />
                    ) : (
                      <Typography>{journey.operator.name}</Typography>
                    )}
                  </a>
                </Paper>
              </Grid>
              <Grid item className="journey__info-up-right">
                <Typography>{journey.destinationLocation}</Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs zeroMinWidth className="journey__arrow">
                <div />
                <IconPlayArrow className="journey__arrow-sting" />
              </Grid>
            </Grid>
            <Grid
              container
              spacing={16}
              wrap="nowrap"
              justify="center"
              className="journey__info-down"
            >
              <Grid item className="journey__info-down-left">
                {sameDay === false ? (
                  <Typography>
                    <Moment format={this.dateFormat}>{departureDate}</Moment>
                  </Typography>
                ) : null}
                <Typography>
                  <Moment format={this.hourFormat}>{departureDate}</Moment>
                </Typography>
              </Grid>
              <Grid item className="journey__info-down-middle">
                <Typography>{journey.prices}</Typography>
              </Grid>
              <Grid item className="journey__info-down-right">
                {sameDay === false ? (
                  <Typography>
                    <Moment format={this.dateFormat}>{arrivalDate}</Moment>
                  </Typography>
                ) : null}
                <Typography>
                  <Moment format={this.hourFormat}>{arrivalDate}</Moment>
                </Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs zeroMinWidth className="journey__operators-text">
                <a
                  href={journey.operator.url}
                  target="_blank"
                  className={
                    !journey.operator.url
                      ? "journey__operators-link--disable"
                      : null
                  }
                >
                  <Typography variant="caption">
                    {journey.operator.name}
                  </Typography>
                </a>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Button
          variant="contained"
          href={journey.linksBusbud}
          target="_blank"
          className="journey__action"
        >
          <Translate
            className="journey__action-text"
            content="travel.search.result.journey_action_label"
          />
          <IconTransferWithinAStation
            className="journey__action-icon"
            style={{ fontSize: 36 }}
          />
        </Button>
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
  prices: PropTypes.string.isRequired,
  operator: PropTypes.shape({
    name: PropTypes.string.isRequired,
    logoUrl: PropTypes.string.isRequired,
    url: PropTypes.string
  }),
  linksBusbud: PropTypes.string
});

Journey.propTypes = {
  journey: JourneyPropTypes.isRequired
};

export default Journey;
