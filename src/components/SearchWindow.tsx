import 'date-fns';
import React from "react";
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment'

import {
    FormControl, FormControlLabel,
    Grid,
    MenuItem, Paper, Radio, RadioGroup, Select, TextField,
    Theme, withStyles, CircularProgress, Button
} from "@material-ui/core";

import {withTranslation} from "react-i18next";

import {getResults, getPollResults} from "../api/busbud";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from "@material-ui/pickers";
import {connect} from "react-redux";
import {State} from "../store/reducer";
import {setDepartures, setRequested, setRequestedDate} from "../store/actions";
import Box from "@material-ui/core/Box";
import {filterDepartures} from "../api/filter";


const useStyles = (theme: Theme) => ({
    paper: {
        position: 'relative' as 'relative',
        padding: theme.spacing(1, 0, 0, 0),
        marginBottom: theme.spacing(2),
        [theme.breakpoints.up('md')]: {
            marginBottom: 0
        }
    },
    searchButton: {
        borderRadius: '0 0 4px 4px',
        padding: '12px 0',
        width: '100%'
    },
    fetching: {
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    row: {
        padding: theme.spacing(1, 2, 1, 2)
    },
    datePicker: {
        padding: theme.spacing(0, 2, 1, 2)
    }

});

interface locationField {
    name: string
    key: string
}

interface dateField {
    text: string
    formatted: string
}

interface SearchForm {
    destination: locationField
    origin: locationField
    date: dateField
    adult: number
    currency: string,
    direction: number
}

interface SearchWindowState {
    complete: boolean
    cities: any[]
    origin_city_id: string
    destination_city_id: string
    locations: any[]
    operators: any[]
    fetching: boolean
    searchForm: SearchForm

}

interface Params {
    adult: number,
    currency: string,
    index?: number
}


class SearchWindow extends React.Component<any, SearchWindowState> {

    state: SearchWindowState = {
        complete: false,
        cities: [],
        origin_city_id: '',
        destination_city_id: '',
        locations: [],
        operators: [],
        fetching: false,
        searchForm: {
            destination: {
                name: 'Montreal',
                key: 'f25dvk'
            },
            origin: {
                name: 'New York',
                key: 'dr5reg'
            },
            date: {
                text: moment('2020-08-02').format('dddd, MMMM D'),
                formatted: '2020-08-02'
            },
            adult: 1,
            currency: 'CAD',
            direction: 1
        }
    };

    scrollToMyRef = () => {
        const {mobileRef} = this.props;
        const scrollToInterval = setInterval(async () => {
            if (mobileRef.current.offsetTop > 0) {
                mobileRef.current.scrollIntoView({behavior: 'smooth'});
                clearInterval(scrollToInterval)
            }
        }, 100)

    };

    setData = async (newDepartures: any) => {
        const {origin_city_id, destination_city_id, cities, locations, operators} = this.state;
        const {departures, setDepartures, filter} = this.props;

        const generateNewDepartures = newDepartures.map((departure: any) => {
            return {
                id: departure.id,
                departure_city: cities.find((city: any) => city.id === origin_city_id).name,
                departure_time: departure.departure_time,
                duration: departure.duration,
                arrival_city: cities.find((city: any) => city.id === destination_city_id).name,
                arrival_time: departure.arrival_time,
                price: departure.prices.total,
                arrival_location: locations.find((loc: any) => loc.id === departure.destination_location_id).name,
                departure_location: locations.find((loc: any) => loc.id === departure.origin_location_id).name,
                operator_logo: operators.find((operator: any) => operator.id === departure.operator_id).logo_url
            }
        });

        const mergeDepartureArrays = [...departures, ...generateNewDepartures];

        setDepartures(
            filterDepartures(filter, mergeDepartureArrays)
        );

    };

    setPolling = async (params: Params) => {
        try {
            const {searchForm} = this.state;

            const interval = setInterval(async () => {
                if (!this.state.complete) {
                    params['index'] = this.props.departures.length;

                    const results = await getPollResults(searchForm.origin.key, searchForm.destination.key, searchForm.date.formatted, params);

                    // Set fresh state after each poll request, then merge departure data via redux.

                    this.setState({
                        locations: results.locations,
                        operators: results.operators,
                        complete: results.complete,
                        fetching: !results.complete
                    }, () => {
                        this.setData(results.departures)
                    })

                } else {

                    this.setState({
                        fetching: false
                    });

                    clearInterval(interval)
                }
            }, 1000)

        } catch (err) {
            console.log(err)
        }
    };

    fetchData = async () => {
        try {
            const {setRequested, setRequestedDate, setDepartures, mobileRef} = this.props;
            const {searchForm} = this.state;

            // Set initial parameters

            let params: Params = {
                adult: searchForm.adult,
                currency: searchForm.currency
            };

            setDepartures([]);
            setRequested(true);
            setRequestedDate(searchForm.date.text);
            this.setState({fetching: true});

            // Scroll to if mobile window active

            if (mobileRef) {
                this.scrollToMyRef();
            }

            // First Request (Not Poll)
            const results = await getResults(searchForm.origin.key, searchForm.destination.key, searchForm.date.formatted, params);

            // Set state if first request successful
            // Callback here initiates polling.
            this.setState({
                    cities: results.cities,
                    origin_city_id: results.origin_city_id,
                    destination_city_id: results.destination_city_id,
                    operators: results.operators,
                    locations: results.locations,
                    complete: results.complete
                },
                () => {
                    if (results.complete) {
                        setTimeout(() => {
                            // Ensure animation consistency if item is fetched too quickly.
                            this.setState({fetching: false});
                            this.setData(results.departures);
                        }, 1000)
                    } else {
                        this.setPolling(params)
                    }
                })
        } catch (err) {
            console.log(err)
        }
    };

    render() {
        const {classes, t} = this.props;
        const {fetching, searchForm} = this.state;

        return (
            <Paper className={classes.paper}>
                <Box position={'absolute'} display={fetching ? 'flex' : 'none'} className={classes.fetching}>
                    <CircularProgress size={80} thickness={4} color={'secondary'}/>
                </Box>
                <form style={{opacity: `${fetching ? '0.4' : '1'}`}} noValidate autoComplete="off">
                    <Grid container wrap={'nowrap'} direction={'column'}>
                        <Grid className={classes.row} container alignItems={'center'} justify={'space-between'}>
                            <Grid item>
                                <FormControl component="fieldset">
                                    <RadioGroup aria-label="direction" name="direction" value={searchForm.direction} row>
                                        <FormControlLabel
                                            value={0}
                                            control={<Radio disabled color="secondary"/>}
                                            label={t('form_roundTrip')}
                                            labelPlacement="end"
                                        />
                                        <FormControlLabel
                                            value={1}
                                            control={<Radio color="secondary"/>}
                                            label={t('form_oneWay')}
                                            labelPlacement="end"
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <FormControl>
                                    <Select
                                        value={searchForm.adult}
                                        color={'secondary'}
                                        disabled

                                    >
                                        {[1, 2, 3, 4, 5].map((val: number) => <MenuItem
                                            value={val}
                                            key={val}>{`${val} ${val === 1 ? t('passenger') : t('passengers')}`}</MenuItem>)}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid className={classes.row} item>
                            <TextField
                                fullWidth
                                label={t('form_leaving')}
                                value={searchForm.origin.name}
                                variant={'filled'}
                                disabled
                            />
                        </Grid>
                        <Grid className={classes.row} item>
                            <TextField
                                fullWidth
                                label={t('form_going')}
                                value={searchForm.destination.name}
                                variant={'filled'}
                                disabled
                            />
                        </Grid>
                        <Grid className={classes.datePicker} container>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    fullWidth
                                    disableToolbar
                                    disabled
                                    variant="inline"
                                    margin="normal"
                                    label={t('form_depart')}
                                    value={searchForm.date.text}
                                    onChange={() => console.log('change not possible...')}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid item>
                            <Button className={classes.searchButton}
                                onClick={() => this.fetchData()}
                                disableRipple={true}
                                variant='contained'
                                color={'secondary'}>
                                {t('form_searchRoutes')}
                            </Button>
                        </Grid>

                    </Grid>
                </form>
            </Paper>
        )
    }
    ;
}

const mapDispatchToProps = (state: State) => {
    return {departures: state.departures, filter: state.filter}
};

export default connect(mapDispatchToProps, {
    setDepartures,
    setRequested,
    setRequestedDate
})(withStyles(useStyles)(withTranslation()(SearchWindow)))

