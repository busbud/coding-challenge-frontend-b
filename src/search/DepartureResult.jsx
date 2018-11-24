import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const options = { weekday: 'long', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };

const DepartureResult = props => {
    const externalLink = () => <a href={props.departure.links.deeplink} target="_blank">View Details</a>
    const departureLocation = props.locations.find(location => location.id === props.departure.origin_location_id);
    const arrivalLocation = props.locations.find(location => location.id === props.departure.destination_location_id);

    return (<Card>
        <CardContent>
            <Typography variant="h6" component="h2">
                ${props.departure.prices.total / 100}
            </Typography>
            <Typography color="textSecondary">
                Leaves <b>{new Date(props.departure.departure_time).toLocaleDateString('en-CA', options)}</b>
            </Typography>
            <Typography color="textSecondary" gutterBottom>
                from <b>{departureLocation.name}</b>
            </Typography>
            <Typography color="textSecondary">
                Arrives <b>{new Date(props.departure.arrival_time).toLocaleDateString('en-CA', options)}</b>
            </Typography>
            <Typography color="textSecondary" gutterBottom>
                at <b>{arrivalLocation.name}</b>
            </Typography>
        </CardContent>
        <CardActions>
            <Button component={externalLink} size="small">
                View Details
            </Button>
        </CardActions>
    </Card>
)};

DepartureResult.propTypes = {
    departure: PropTypes.object.isRequired,
    locations: PropTypes.array.isRequired,
};

export default DepartureResult;
