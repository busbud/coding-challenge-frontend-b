import 'date-fns';
import React from "react";

import {
    makeStyles, Theme
} from "@material-ui/core";

import {useTranslation} from "react-i18next";

import {useDispatch, useSelector} from "react-redux";
import {Departure, State} from "../store/reducer";
import Box from "@material-ui/core/Box";
import RouteCard from "./routeCard";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {setDepartures, setFilter, setRequested} from "../store/actions";

import withStyles from "@material-ui/core/styles/withStyles";
import SkeletonCard from "./skeletonCard";
import Paper from "@material-ui/core/Paper";
import {Flipper} from "react-flip-toolkit";
import {filterDepartures} from "../api/filter";


const useStyles = makeStyles((theme: Theme) => {
    return {
        paper: {
            padding: theme.spacing(2)
        },
        activeButton: {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.getContrastText(theme.palette.secondary.main)
        },
        inactiveButton: {
            backgroundColor: theme.palette.common.white
        },
        buttonContainer: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                justifyContent: 'flex-start'
            }
        },
        fetching: {
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }
    }
});

export const FilterButton = withStyles((theme: Theme) => ({
    root: {
        flex: '0 49%',
        margin: theme.spacing(1, 0, 1, 0),
        [theme.breakpoints.up('sm')]: {
            flex: 'auto',
            margin: theme.spacing(0, 1, 1, 0)
        },
        ['&:last-child']: {
            marginRight: '0'
        }
    }
}))(Button);


const RoutesWindow = () => {

    const {t} = useTranslation();

    const classes = useStyles();

    const departures = useSelector((state: State) => state.departures);
    const date = useSelector((state: State) => state.requested_date);
    const currentFilter = useSelector((state: State) => state.filter);

    const dispatch = useDispatch();


    const updateFilter = (newFilter: number) => {
        if (newFilter !== currentFilter) {
            dispatch(setFilter(newFilter));
            dispatch(setDepartures(filterDepartures(newFilter, departures)))
        }
    };

    const resetForm = () => {
        dispatch(setFilter(1));
        dispatch(setDepartures([]));
        dispatch(setRequested(false));
    };


    return (
        <React.Fragment>
            <Paper>
                <Box p={0.5} mb={1} display={'flex'} alignItems='center' justifyContent={'space-between'}>
                    <Button size={'small'} onClick={resetForm}>{t('reset')}</Button>
                    <Box pl={'5px'} pr={'5px'}>
                        <Typography style={{fontWeight: 'bold'}} variant={'subtitle1'}
                                    color={'secondary'}>{date}</Typography>
                    </Box>
                </Box>
            </Paper>
            <Box display={'flex'} justifyContent={'space-between'}>
                <Box className={classes.buttonContainer}>
                    {[t('cheapest'), t('fastest'), t('earliest'), t('latest')].map((button: string, int: number) =>
                        <FilterButton
                            size={'small'}
                            key={button}
                            variant={'contained'}
                            className={int === currentFilter ? classes.activeButton : classes.inactiveButton}
                            color={'inherit'}
                            onClick={() => updateFilter(int)}
                            disableRipple={true}
                        >
                            {button}
                        </FilterButton>
                    )}
                </Box>
            </Box>
            <Flipper flipKey={currentFilter}>
                {
                    departures.length
                        ? departures.map((departure: Departure) => <RouteCard key={departure.id}
                                                                              departure={departure}/>)
                        : [0, 1, 2, 3].map((val: number) => <SkeletonCard key={val}/>)
                }
            </Flipper>
        </React.Fragment>
    )
};

export default RoutesWindow;

