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
import { selectSchedulesFromState } from '../../store/schedules/selectors';
import { selectLanguageFromState } from '../../store/language/selectors';
import { BootstrapInput } from '../../config/theme';
import Select from '@material-ui/core/Select';
import { yellow } from '@material-ui/core/colors';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        // marginLeft: theme.spacing(1),
        // marginRight: theme.spacing(1),
        // width: 200,
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

const searchContent = () => {
    const classes = useStyles();
    const { language } = useSelector(selectLanguageFromState);
    const [departure, setDeparture] = React.useState('f2m673');
    const [destination, setDestination] = React.useState('f25dvk');
    const [departureDate, setDepartureDate] = React.useState(new Date());
    const [adultsNumber, setAdultNumbers] = React.useState(1);
    contentLanguages.setLanguage(language);

    const handleDepartureChange = (event: any) => {
        setDeparture(event.target.value);
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

    return (
        <>
            {' '}
            <div>
                <Grid container justify="space-around">
                    <FormControl className={classes.margin}>
                        <InputLabel id="departure-select-label">
                            Departure from
                        </InputLabel>
                        <Select
                            labelId="departure-label"
                            id="departure-select"
                            value={departure}
                            onChange={handleDepartureChange}
                            input={<BootstrapInput />}
                        >
                            <MenuItem value={'f2m673'}>Québec</MenuItem>
                            <MenuItem value={'f25dvk'}>Montréal</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className={classes.margin}>
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
                    <FormControl className={classes.container}>
                        <TextField
                            id="adult-number"
                            label="Adults"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={handleAdultNumberChange}
                            variant="outlined"
                            defaultValue={adultsNumber}
                        />
                    </FormControl>
                    <FormControl className={classes.container}>
                        <SearchButton variant="contained" color="primary" className={classes.margin}>
                            {contentLanguages.search}
                        </SearchButton>
                    </FormControl>
                </Grid>
            </div>
        </>
    );
};

export default searchContent;
