import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles, withTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import TimerIcon from '@material-ui/icons/Timer';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import busbudOsheagaImage from '../img/d497c20.busbud-press-logo - Copy2.png';
import Chip from '@material-ui/core/Chip';
import { FormattedMessage } from 'react-intl';
import { injectIntl, FormattedDate } from 'react-intl';

const styles = theme => ({
    root: {
        padding: '1rem 1rem',
        minHeight: '100vh',
        background: 'linear-gradient(-180deg,#50c4c9,#7cc9d0 21%,#c882a8 50%,#dd7794 61%,#ec9c5f 81%,#e79d53)'
    },
    tripList: {
    },
    tripListSearching: {
        backgroundColor: 'white',
        //color: 'white',
        padding: '1rem',
        margin: '1rem 0',
        marginBottom: '2rem'
    },
    errorDiv: {
        background: 'white',
        padding: '30px'
    },
    loadingDiv: {
        background: 'white',
        padding: '30px'
    },
    icon: {
        position: "relative",
        top: theme.spacing.unit
    },
    tripListChip: {
        marginBottom: '0.5em'
    },
    tripListHeader: {
        color: 'white'
    },
    card: {
    },
    logoImg: {
        maxWidth: '60vh'
    },
});

class TripListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMsg: null,
            hasError: false,
            tripsData: {
                origin_city_id: '',
                destination_city_id: '',
                operators: [],
                locations: [],
                departures: [],
                complete: false,
                minPrice: 0,
                maxPrice: 0,
                minDuration: '',
                maxDuration: '',
                minDepartureTime: '',
                maxDepartureTime: ''
            }
        };
        this.searchParams = {
            originGeodash: 'dr5reg', // NYC
            destinationGeodash: 'f25dvk', // Montreal
            outbound_date: '2019-08-02',
            nbAdults: 1,
            nbChildren: 0,
            nbSeniors: 0,
            langParam: 'US',
            currencyParam: 'USD'
        };
        this.requestData = {
            acceptHeader: 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
            busbudTokenHeader: 'PARTNER_AHm3M6clSAOoyJg4KyCg7w',
            baseUrl: 'https://napi.busbud.com/x-departures/',
            firstFetchPath: this.searchParams.originGeodash + '/' + this.searchParams.destinationGeodash + '/' + this.searchParams.outbound_date,
            firstFetchQueryString: '?adult=' + this.searchParams.nbAdults + '&child=' + this.searchParams.nbChildren + '&senior=' + this.searchParams.nbSeniors + '&lang=' + this.searchParams.langParam + '&currency=' + this.searchParams.currencyParam
        };
        //this.requestData.pollPath = this.requestData.firstFetchPath + '/poll';
        //this.requestData.pollQueryString = this.requestData.firstFetchQueryString + '&index=0';
    }

    // Book trip action
    handleBookTripClick = event => {
        window.open('https://www.busbud.com', '_blank');
    };

    // convert data from json to simpler objects

    convertOperator(operatorJson) {
        const operator = {
            id: operatorJson.id,
            name: operatorJson.display_name,
            logo_url: operatorJson.logo_url
        };
        return operator;
    }

    convertMinutesInTime(minutes) {
        var num = minutes;
        var hours = (num / 60);
        var rhours = Math.floor(hours);
        var minutes = (hours - rhours) * 60;
        var rminutes = Math.round(minutes);
        return rhours + "h" + rminutes + "m";
    }

    convertDeparture(departureJson, tripsData) {
        const departure = {
            id: departureJson.busbud_departure_id,
            hasWifi: departureJson.amenities.wifi,
            available_seats: departureJson.available_seats,
            originLocation: this.findLocationById(departureJson.origin_location_id, tripsData),
            destinationLocation: this.findLocationById(departureJson.destination_location_id, tripsData),
            duration: this.convertMinutesInTime(departureJson.duration),
            durationMinutes: departureJson.duration,
            operator: this.findoperatorById(departureJson.operator_id, tripsData),
            departure_time: departureJson.departure_time.substring(11, 16),
            arrival_time: departureJson.arrival_time.substring(11, 16),
            currency: departureJson.prices.currency,
            price: departureJson.prices.total / 100
        };
        return departure;
    }

    convertLocation(locationJson, tripsData) {
        const location = {
            id: locationJson.id,
            name: locationJson.name,
            type: locationJson.type.replace('_', ' '),
            city: this.findCityById(locationJson.city_id, tripsData)
        };
        return location;
    }

    convertJsonResponse(result) {
        const td = this.state.tripsData;
        if (result.hasOwnProperty('origin_city_id') && result.origin_city_id !== '') {
            td.origin_city_id = result.origin_city_id;
        }
        if (result.hasOwnProperty('destination_city_id') && result.destination_city_id !== '') {
            td.destination_city_id = result.destination_city_id;
        }
        if (result.hasOwnProperty('operators') && result.operators.length > 0) {
            td.operators = td.operators.concat(result.operators.map(x => this.convertOperator(x)));
        }
        if (result.hasOwnProperty('locations') && result.locations.length > 0) {
            td.locations = td.locations.concat(result.locations.map(x => this.convertLocation(x, td)));
        }
        if (result.hasOwnProperty('departures') && result.departures.length > 0) {
            td.departures = td.departures.concat(result.departures.map(x => this.convertDeparture(x, td)));
        }
        // sort departures by date
        td.departures.sort(function (a, b) { return a.departure_time.localeCompare(b.departure_time); });
        // get min and max durations and prices and times
        if (td.departures.length > 0) {
            var pricesArray = td.departures.map(x => x.price);
            td.minPrice = Math.min(...pricesArray);
            td.maxPrice = Math.max(...pricesArray);
            var durationsArray = td.departures.map(x => x.durationMinutes).sort();
            td.minDuration = this.convertMinutesInTime(durationsArray[0]);
            td.maxDuration = this.convertMinutesInTime(durationsArray[durationsArray.length - 1]);
            td.minDepartureTime = td.departures[0].departure_time;
            td.maxDepartureTime = td.departures[td.departures.length - 1].departure_time;
        }
        td.complete = result.complete;

        return td;
    }

    // find by

    findCityById(id, tripsData) {
        // TODO : use cities object in json    
        if (id === tripsData.origin_city_id) {
            return 'New York';
        } else if (id === tripsData.destination_city_id) {
            return 'Montreal';
        } else {
            return 'Unknown city';
        }
    }

    findLocationById(id, tripsData) {
        var found = tripsData.locations.find(function (element) {
            return element.id === id;
        });
        return found;
    }

    findoperatorById(id, tripsData) {
        var found = tripsData.operators.find(function (element) {
            return element.id === id;
        });
        return found;
    }

    // start search request

    initializeTripSearch() {
        const firstFetchUrl = this.requestData.baseUrl + this.requestData.firstFetchPath + this.requestData.firstFetchQueryString;
        //https://napi.busbud.com/x-departures/dr5reg/f25dvk/2019-08-02?adult=1&child=0&senior=0&lang=US&currency=USD

        fetch(firstFetchUrl, {
            headers: {
                'Accept': this.requestData.acceptHeader,
                'X-Busbud-Token': this.requestData.busbudTokenHeader
            }
        })
            .then(res => res.json())
            .then(
                (result) => {
                    const td = this.convertJsonResponse(result);
                    // set state
                    this.setState({
                        tripsData: td,
                        hasError: false
                    });
                    // check if search is complete or polling is necessary
                    if (this.state.tripsData.complete === false) {
                        this.onSearchIncomplete();
                    }
                },
                (error) => {
                    const td = this.state.tripsData;
                    td.complete = true;
                    // set state
                    this.setState({
                        tripsData: td,
                        hasError: true,
                        errorMsg: error
                    });
                }
            )
    };

    // poll search request

    pollTripSearch() {
        const pollIndex = this.state.tripsData.departures.length;
        const pollUrl = this.requestData.baseUrl + this.requestData.firstFetchPath + '/poll' + this.requestData.firstFetchQueryString + '&index=' + pollIndex;
        //https://napi.busbud.com/x-departures/dr5reg/f25dvk/2019-08-02/poll?adult=1&child=0&senior=0&lang=US&currency=USD&index=0

        fetch(pollUrl, {
            headers: {
                'Accept': this.requestData.acceptHeader,
                'X-Busbud-Token': this.requestData.busbudTokenHeader
            }
        })
            .then(res => res.json())
            .then(
                (result) => {
                    const td = this.convertJsonResponse(result);
                    // set state
                    this.setState({
                        tripsData: td,
                        hasError: false
                    });
                    // check if search is complete or polling is necessary
                    if (this.state.tripsData.complete === false) {
                        this.onSearchIncomplete();
                    }
                },
                (error) => {
                    const td = this.state.tripsData;
                    td.complete = true;
                    // set state
                    this.setState({
                        tripsData: td,
                        hasError: true,
                        errorMsg: error
                    });
                }
            )
    };

    // when search is incomplete, wait 3 seconds before polling
    onSearchIncomplete() {
        var self = this;
        setTimeout(function () { self.pollTripSearch(); }, 3000);
    }

    // component is mounted, start search
    componentDidMount() {
        this.initializeTripSearch()
    }

    // render

    render() {
        const { errorMsg, hasError, tripsData } = this.state;
        const { classes, date, intl } = this.props;

        return (
            <React.Fragment>

                <div className={classes.root}>

                    <div className={classes.tripListHeader}>
                        <Box color="secondary.main" className={classes.tripListSearching} borderRadius={18}>
                            {intl.formatMessage({ id: 'tripListSearching.SearchOf' })} <span style={{ textDecoration: 'underline' }}><b>{intl.formatMessage({ id: 'tripListSearching.SearchOneWay' })}</b></span> {intl.formatMessage({ id: 'tripListSearching.SearchTrip' })} {intl.formatMessage({ id: 'tripListSearching.SearchFrom' })} <b>{intl.formatMessage({ id: 'tripListSearching.SearchNYC' })}</b> {intl.formatMessage({ id: 'tripListSearching.SearchTo' })} <b>{intl.formatMessage({ id: 'tripListSearching.SearchMTL' })}</b> {intl.formatMessage({ id: 'tripListSearching.SearchOn' })} <b>{intl.formatMessage({ id: 'tripListSearching.SearchDate' })}</b>

                            {hasError === false && tripsData.complete === true &&
                                <React.Fragment>
                                    <br/><br/>
                                    <Chip className={classes.tripListChip}
                                        icon={<FormatListNumberedIcon />}
                                        label={intl.formatMessage({ id: 'tripListSearching.SearchResultNbResults' }, { nbDepartures: tripsData.departures.length })}
                                    /> &nbsp;
                                    <Chip className={classes.tripListChip}
                                        icon={<AttachMoneyIcon />}
                                        label={intl.formatMessage({ id: 'tripListSearching.SearchResultCheapest' }, { minPrice: tripsData.minPrice, currencyParam: this.searchParams.currencyParam })}
                                    /> &nbsp;
                                    <Chip className={classes.tripListChip}
                                        icon={<TimerIcon />}
                                        label={intl.formatMessage({ id: 'tripListSearching.SearchResultFastest' }, { minDuration: tripsData.minDuration })}
                                    /> &nbsp;
                                    <Chip className={classes.tripListChip}
                                        icon={<AccessTimeIcon />}
                                        label={intl.formatMessage({ id: 'tripListSearching.SearchResultEarliest' }, { minDepartureTime: tripsData.minDepartureTime })}
                                    /></React.Fragment>
                            }
                        </Box>
                    </div>
                    <br/>

                    {hasError === true && <React.Fragment> <div className={classes.errorDiv}>Error: {errorMsg.message}</div> </React.Fragment>}
                    {hasError === false && tripsData.complete === false && <React.Fragment> <div className={classes.loadingDiv}>{intl.formatMessage({ id: 'tripListSearching.Loading' })}...  <br /><CircularProgress className={classes.progress} color="secondary" /></div> </React.Fragment>}
                    {hasError === false && tripsData.complete === true &&
                        <React.Fragment>
                            <div className={classes.tripList}>

                                {tripsData.departures.map(departure => (
                                    <React.Fragment>
                                        <Card className={classes.card} boxShadow={2}>
                                            <CardContent>

                                                <Grid container spacing={2} gutterBottom>
                                                    <Grid item xs={2}>
                                                        <Avatar aria-label="Recipe" className={classes.avatar}>
                                                            {departure.operator.name.substring(0, 2).toUpperCase()}
                                                        </Avatar>
                                                    </Grid>
                                                    <Grid item xs={8} style={{ textAlign: "left" }}>
                                                        <Typography gutterBottom variant="subtitle1" style={{ textTransform: 'uppercase', fontWeight: 'bold', color: '#616161' }}>
                                                            {departure.operator.name}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item style={{ textAlign: "right" }} xs={2}>
                                                        <Typography variant="subtitle1" color="primary"><b>${departure.price} {departure.currency} &nbsp;</b></Typography>
                                                    </Grid>
                                                </Grid>

                                                <Grid container spacing={2} gutterBottom style={{ marginLeft: "0.5rem" }}>
                                                    <Grid item xs={12}>
                                                        <Typography variant="body2">
                                                            <Typography color="primary" variant="subtitle2" display="inline"><b>{departure.departure_time}</b></Typography>
                                                            &nbsp; &nbsp;   {departure.originLocation.city} - {departure.originLocation.name} ({departure.originLocation.type})
                                                            </Typography>
                                                        <Typography variant="body2">
                                                            <ArrowDownwardIcon color="primary" /> &nbsp;
                                                            </Typography>
                                                        <Typography variant="body2">
                                                            <Typography color="primary" variant="subtitle2" display="inline"><b>{departure.arrival_time}</b></Typography>
                                                            &nbsp; &nbsp;   {departure.destinationLocation.city} - {departure.destinationLocation.name} ({departure.destinationLocation.type})
                                                            </Typography>
                                                    </Grid>
                                                </Grid>

                                                <Grid container spacing={2} gutterBottom>
                                                    <Grid item xs={6}>
                                                        <Typography variant="body2" color="textSecondary" style={{ marginLeft: "0.5rem" }}>
                                                            <DirectionsBusIcon className={classes.icon} color="disabled" /> {departure.duration}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item style={{ textAlign: "right" }} xs={6}>
                                                        <Fab fullWidth variant="extended" color="secondary" aria-label={intl.formatMessage({ id: 'tripListSearching.BookAction' })} style={{ cursor: 'pointer' }}
                                                            onClick={this.handleBookTripClick}>{intl.formatMessage({ id: 'tripListSearching.BookAction' })}</Fab>
                                                    </Grid>
                                                </Grid>

                                            </CardContent>
                                        </Card>
                                        <br /><br />
                                    </React.Fragment>
                                ))}

                            </div>
                        </React.Fragment>
                    }
                </div>
            </React.Fragment>
        );

    }
}

TripListPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(injectIntl(TripListPage));
