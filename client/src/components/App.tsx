import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import SearchContainer from './SearchContainer/SearchContainer';
import ScheduleItem from './ScheduleItem/ScheduleItem';
import './App.scss';
import { supportedLanguages } from '../utils/language';
import { getDepartureInfo } from '../utils/departures';
import { goToLanguage } from '../store/router/actions';
import { useDispatch, useSelector } from 'react-redux';
import { selectSchedulesFromState } from '../store/schedules/selectors';
import { selectLanguageFromState } from '../store/language/selectors';
import { BootstrapInput } from '../config/theme';
import { getSchedules } from '../store/schedules/actions';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    content: {
        overflowY: 'auto',
        height: 'calc(100vh - 50px)',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    pad: {
        height: 56,
    },
}));

const app = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { language } = useSelector(selectLanguageFromState);
    const [displayedLanguage, setDisplayedLanguage] = React.useState(language);
    const { schedules, loading, searchCriteria } = useSelector(
        selectSchedulesFromState
    );
    console.log(schedules);
    console.log(loading);
    console.log(searchCriteria);

    if (schedules?.complete === false) {
        console.log('not complete ');
        // setTimeout(() => {
        //     dispatch(
        //         getSchedules.request({
        //             ...searchCriteria,
        //             index: schedules?.departures.length,
        //         })
        //     );
        // }, 2000);
    }

    const handleLanguageChange = (event: any) => {
        const newLanguage = event?.target?.value;
        dispatch(goToLanguage(newLanguage));
        setDisplayedLanguage(newLanguage);
    };

    const getDepartureDetails = React.useCallback(
        (departure) => {
            return getDepartureInfo(schedules, departure);
        },
        [schedules]
    );

    return (
        <>
            <div className={classes.root}>
                <AppBar position="fixed" className="not-scrolled">
                    <Toolbar>
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="menu"
                        >
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Osheaga 2021
                        </Typography>
                        <Select
                            labelId="language-select-label"
                            id="language-select"
                            value={displayedLanguage}
                            onChange={handleLanguageChange}
                            input={<BootstrapInput />}
                        >
                            {supportedLanguages?.map(
                                (supportedLanguage, index) => (
                                    <MenuItem
                                        key={index}
                                        value={supportedLanguage.id}
                                    >
                                        {supportedLanguage.label}
                                    </MenuItem>
                                )
                            )}
                        </Select>
                    </Toolbar>
                </AppBar>
                <div className={classes.pad} />
                <div className={classes.content} >
                    <SearchContainer />
                    {schedules?.departures?.length > 0 &&
                    schedules?.departures?.map((departure, index) => (
                        <ScheduleItem
                            key={index}
                            data={getDepartureDetails(departure)}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default app;
