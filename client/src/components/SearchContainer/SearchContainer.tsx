import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withStyles, makeStyles, Theme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { contentLanguages } from '../../utils/language';
import { selectLanguageFromState } from '../../store/language/selectors';
import { BootstrapInput } from '../../config/theme';
import Select from '@material-ui/core/Select';
import { yellow } from '@material-ui/core/colors';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { getSchedules } from '../../store/schedules/actions';
import {SearchCriteria} from "../../api/interfaces";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: 10,
        backgroundColor: '#0288d1',
    },
    margin: {
        margin: theme.spacing(1),
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        margin: theme.spacing(1),
    },
    adultsNumberContainer: {
        marginTop: 15,
    },
    searchContainer: {
        marginTop: 15,
    },
}));

const SearchButton = withStyles((theme: Theme) => ({
    root: {
        color: theme.palette.getContrastText(yellow[500]),
        backgroundColor: yellow[500],
        '&:hover': {
            backgroundColor: yellow[700],
        },
    },
}))(Button);

const searchContainer = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const { language } = useSelector(selectLanguageFromState);
    const [origin, setOrigin] = React.useState('f2m673');
    const [destination, setDestination] = React.useState('f25dvk');
    const [departureDate, setDepartureDate] = React.useState(new Date());
    const [adultsNumber, setAdultNumbers] = React.useState(1);
    contentLanguages.setLanguage(language);

    const handleOriginChange = (event: any) => {
        setOrigin(event.target.value);
    };

    const handleDestinationChange = (event: any) => {
        setDestination(event.target.value);
    };

    const handleDepartureDateChange = (event: any) => {
        setDepartureDate(event);
    };

    const handleAdultNumberChange = (event: any) => {
        setAdultNumbers(event.target.value);
    };

    const handleSearchClick = () => {
        const formattedDate = departureDate.toISOString()?.split('T')[0];
        const search: SearchCriteria = {origin, destination, outbound_date: formattedDate, adult: adultsNumber, lang: language};
        dispatch(getSchedules.request(search));
    };

    return (
        <>
            <div className={classes.root}>
                <Grid container justify="space-around">
                    <Grid item xs={12} sm={6} md={3}>
                        <FormControl className={classes.container}>
                            <InputLabel id="departure-select-label">
                                Departure from
                            </InputLabel>
                            <Select
                                labelId="departure-label"
                                id="departure-select"
                                value={origin}
                                onChange={handleOriginChange}
                                input={<BootstrapInput />}
                            >
                                <MenuItem value={'f2m673'}>Québec</MenuItem>
                                <MenuItem value={'f25dvk'}>Montréal</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <FormControl className={classes.container}>
                            <InputLabel id="destination-select-label">
                                Destination
                            </InputLabel>
                            <Select
                                labelId="destination-label"
                                id="destination-select"
                                value={destination}
                                onChange={handleDestinationChange}
                                input={<BootstrapInput />}
                            >
                                <MenuItem value={'f25dvk'}>Montréal</MenuItem>
                                <MenuItem value={'f2m673'}>Québec</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                        <FormControl className={classes.container}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="yyyy/MM/dd"
                                    margin="normal"
                                    id="departure-date-picker-inline"
                                    label="Departure Date"
                                    value={departureDate}
                                    minDate={new Date()}
                                    onChange={handleDepartureDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                    inputVariant="outlined"
                                />
                            </MuiPickersUtilsProvider>
                        </FormControl>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={2}
                        className={classes.adultsNumberContainer}
                    >
                        <FormControl className={classes.container}>
                            <TextField
                                id="adult-number"
                                label="Adults"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    inputProps: {
                                        min: 1,
                                    },
                                }}
                                onChange={handleAdultNumberChange}
                                variant="outlined"
                                defaultValue={adultsNumber}
                            />
                        </FormControl>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={2}
                        className={classes.searchContainer}
                    >
                        <FormControl className={classes.container}>
                            <SearchButton
                                variant="contained"
                                color="primary"
                                className={classes.margin}
                                onClick={handleSearchClick}
                            >
                                {contentLanguages.search}
                            </SearchButton>
                        </FormControl>
                    </Grid>
                </Grid>
            </div>
        </>
    );
};

export default searchContainer;
