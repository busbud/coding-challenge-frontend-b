import React from 'react';
import PropTypes from 'prop-types';
import { withNamespaces } from "react-i18next";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import './DepartureResult.scss';

const options = { weekday: 'long', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };

const DepartureResult = props => {
    const externalLink = () => <a href={props.departure.links.deeplink} target="_blank">{props.t('search.result.viewDetailsLink')}</a>
    const departureLocation = props.locations.find(location => location.id === props.departure.origin_location_id);
    const arrivalLocation = props.locations.find(location => location.id === props.departure.destination_location_id);

    const leaveTime = new Date(props.departure.departure_time).toLocaleDateString('en-CA', options);
    const arrivalTime = new Date(props.departure.arrival_time).toLocaleDateString('en-CA', options);

    return (
        <Paper className='departure-result'>
            <Grid container spacing={16}>
                <Grid item>
                    <img alt="complex" src={props.city.image_url} />
                </Grid>
                <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={16}>
                        <Grid item xs>
                            <Typography gutterBottom variant="subtitle1">
                                {props.departure.class}
                            </Typography>
                            <Typography component='div'>
                                <div dangerouslySetInnerHTML={{__html: props.t('search.result.departureTime', { time: leaveTime})}}></div>
                            </Typography>
                            <Typography component='div' color="textSecondary" gutterBottom>
                                <div dangerouslySetInnerHTML={{__html: props.t('search.result.departureLocation', { location: departureLocation.name})}}></div>
                            </Typography>
                            <Typography component='div'>
                                <div dangerouslySetInnerHTML={{__html: props.t('search.result.arrivalTime', { time: arrivalTime})}}></div>
                            </Typography>
                            <Typography component='div' color="textSecondary" gutterBottom>
                                <div dangerouslySetInnerHTML={{__html: props.t('search.result.arrivalLocation', { location: arrivalLocation.name})}}></div>
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button component={externalLink} size="small">
                                {props.t('search.result.viewDetailsLink')}
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1">
                            {props.t('search.result.price', { amount: props.departure.prices.total / 100})}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    )
};

DepartureResult.propTypes = {
    departure: PropTypes.object.isRequired,
    locations: PropTypes.array.isRequired,
    city: PropTypes.object.isRequired,
};

export default withNamespaces()(DepartureResult);
