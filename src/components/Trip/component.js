/* eslint-disable react/style-prop-object */
import React from 'react';
import { object, string, number, bool, func } from 'prop-types';
import { FormattedMessage, FormattedDate, FormattedTime, FormattedNumber } from 'react-intl';
import Grid from 'material-ui/Grid';
import Hidden from 'material-ui/Hidden';
import Collapse from 'material-ui/transitions/Collapse';
import IconButton from 'material-ui/IconButton';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import DirectionsBusIcon from 'material-ui-icons/DirectionsBus';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import { getHours, getMinutes, formattedAddress } from '../../utils/helpers';
import messages from './messages';

const propTypes = {
  classes: object.isRequired,
  departure_time: string.isRequired,
  arrival_time: string.isRequired,
  duration: number.isRequired,
  origin_location: object.isRequired,
  destination_location: object.isRequired,
  prices: object.isRequired,
  links: object.isRequired,
  isExpanded: bool.isRequired,
  toggleExpansion: func.isRequired,
};

const Component = ({
  classes,
  departure_time,
  arrival_time,
  duration,
  origin_location,
  destination_location,
  prices,
  links,
  isExpanded,
  toggleExpansion,
}) => {
  const departureTime = new Date(departure_time);
  const arrivalTime = new Date(arrival_time);
  const durationHours = getHours(duration);
  const durationMinutes = getMinutes(duration);

  return (
    <Grid item md={6} xs={12}>
      <Card>
        <CardContent>
          <Grid container justify="center" alignItems="center">
            <Grid className={classes.departure} item md={5} xs={6}>
              <Typography gutterBottom>
                <FormattedDate value={departureTime} month="long" day="2-digit" />
              </Typography>

              <Typography variant="display1">
                <FormattedTime value={departureTime} />
              </Typography>
            </Grid>
            <Hidden mdDown>
              <Grid className={classes.duration} item xs={2}>
                <DirectionsBusIcon color="action" />
                <Typography className={classes.duration}>
                  {durationHours && (
                    <FormattedMessage
                      className="duration__hours"
                      values={{ amount: durationHours }}
                      {...messages.hours}
                    />
                  )}
                  {durationMinutes && (
                    <FormattedMessage
                      className="duration__minutes"
                      values={{ amount: durationMinutes }}
                      {...messages.minutes}
                    />
                  )}
                </Typography>
              </Grid>
            </Hidden>
            <Grid className={classes.arrival} item md={5} xs={6}>
              <Typography gutterBottom>
                <FormattedDate value={arrivalTime} month="long" day="2-digit" />
              </Typography>

              <Typography variant="display1">
                <FormattedTime value={arrivalTime} />
              </Typography>
            </Grid>
          </Grid>
        </CardContent>

        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Grid container justify="space-between" alignItems="center">
              <Grid className={classes.departure} item xs={5}>
                <Typography variant="title">{origin_location.name}</Typography>
                <Typography>{formattedAddress(origin_location)}</Typography>
              </Grid>
              <Grid className={classes.arrival} item xs={5}>
                <Typography variant="title">{destination_location.name}</Typography>
                <Typography>{formattedAddress(destination_location)}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Collapse>

        <CardActions className={classes.actions} disableActionSpacing>
          <Typography variant="button">
            <FormattedNumber value={prices.total / 100} style="currency" currency={prices.currency} />
          </Typography>
          <Button href={links.deeplink} target="_blank" color="primary">
            <FormattedMessage {...messages.action_booking} />
          </Button>
          <IconButton
            className={`${classes.expand} ${isExpanded ? classes.expandOpen : ''}`}
            onClick={toggleExpansion}
            aria-expanded={isExpanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

Component.propTypes = propTypes;

export default Component;
