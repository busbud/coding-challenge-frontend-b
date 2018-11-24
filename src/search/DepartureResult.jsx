import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
];
const options = { weekday: 'long', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };


const DepartureResult = props => {
    const externalLink = () => <a href={props.departure.links.deeplink} target="_blank">View Details</a>
    
    const formatDate = (date) => {
        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();
      
        return `${day} ${monthNames[monthIndex]} ${year} at `;
    }

    return (<Card>
        <CardContent>
            <Typography color="textSecondary" gutterBottom>
                {props.location.name}
            </Typography>
            <Typography variant="h5" component="h2">
                ${props.departure.prices.total / 100}
            </Typography>
            <Typography color="textSecondary">
                Leaves {new Date(props.departure.departure_time).toLocaleDateString('en-CA', options)}
            </Typography>
            <Typography color="textSecondary">
                Arrives {new Date(props.departure.arrival_time).toLocaleDateString('en-CA', options)}
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
    location: PropTypes.object.isRequired,
};

export default DepartureResult;
