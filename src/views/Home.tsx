import 'date-fns';
import React, {useRef} from 'react';

import Nav from "../components/nav";
import SearchWindow from "../components/SearchWindow";
import IntroWindow from "../components/IntroWindow";
import {Box, Container, Hidden, makeStyles, Theme} from "@material-ui/core";
import {useSelector} from "react-redux";
import {State} from "../store/reducer";
import RoutesWindow from "../components/RoutesWindow";

const useStyles = makeStyles((theme: Theme) => {
    return {
        desktopContainer: {
            display: 'flex',
            flexDirection: 'column',
            zIndex: 1,
            overflow: 'hidden'
        },
        background: {
            position: 'absolute',
            top: 0,
            left: 0,
            minHeight: '100%',
            width: '100%',
            transition: 'transform 1s ease-in-out'
        },
        backgroundPrimary: {
            background: theme.palette.primary.main,
            color: theme.palette.getContrastText(theme.palette.primary.main),
            [theme.breakpoints.up('md')]: {
                background: 'linear-gradient(105deg, #eff1f4 50%, #50C4C9 50%)'
            }
        },
        backgroundSecondary: {
            background: '#eff1f4 ',
            [theme.breakpoints.up('md')]: {
                background: 'linear-gradient(105deg, #50C4C9 50%, #eff1f4 50%)'
            }
        },
        active: {
            [theme.breakpoints.up('md')]: {
                transform: 'translateX(0%)'
            }
        },
        primaryInactive: {
            [theme.breakpoints.up('md')]: {
                transform: 'translateX(-100%)'
            }
        },
        secondaryInactive: {
            [theme.breakpoints.up('md')]: {

                transform: 'translateX(100%)'
            }
        },
        window: {
            [theme.breakpoints.up('md')]: {
                position: 'relative',
                width: '50%',
                padding: theme.spacing(2),
                transition: 'transform 1s ease-in-out'
            }
        },
        windowContainer: {
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            [theme.breakpoints.up('md')]: {
                flexDirection: 'row',
                alignItems: 'center',
                width: '150%'
            }
        },
        windowRoutes: {
            [theme.breakpoints.up('md')]: {
                maxHeight: '600px',
                overflow: 'scroll'
            }
        },
        hide: {
            opacity: 0
        },

    }
});

const Home = () => {
    const classes = useStyles();
    const requested = useSelector((state: State) => state.requested);
    const setPrimaryActiveClass = requested ? classes.primaryInactive : classes.active;
    const setSecondaryActiveClass = requested ? classes.active : classes.secondaryInactive;
    const mobileRef = useRef(null);

    return (
        <React.Fragment>
            {/* Mobile Display */}
            <Hidden mdUp>
                <Box display={'flex'} flexDirection={'column'}>
                    <Container className={classes.backgroundPrimary}>
                        <Nav/>
                        <Box className={`${classes.window} ${setPrimaryActiveClass}`}>
                            <IntroWindow/>
                        </Box>
                        <Box className={`${classes.window} ${setPrimaryActiveClass}`}>
                            <SearchWindow mobileRef={mobileRef}/>
                        </Box>
                    </Container>
                        <Container ref={mobileRef} hidden={!requested} className={classes.backgroundSecondary}>
                            <Box mt={2}
                                 className={`${classes.windowRoutes} ${classes.window} ${setPrimaryActiveClass}`}>
                                <RoutesWindow />
                            </Box>
                        </Container>

                </Box>
            </Hidden>

            {/* Desktop Display */}
            <Hidden smDown>
                <div className={`${classes.background} ${classes.backgroundPrimary} ${setPrimaryActiveClass}`}/>
                <div className={`${classes.background} ${classes.backgroundSecondary} ${setSecondaryActiveClass}`}/>
                <Container className={classes.desktopContainer}>
                    <Nav/>
                    <Box className={classes.windowContainer}>
                        <Box className={`${classes.window} ${setPrimaryActiveClass}`}>
                            <IntroWindow/>
                        </Box>
                        <Box className={`${classes.window} ${setPrimaryActiveClass}`}>
                            <SearchWindow/>
                        </Box>
                        <Box className={`${!requested ? classes.hide : ''} ${classes.windowRoutes} ${classes.window} ${setPrimaryActiveClass}`}>
                            <RoutesWindow/>
                        </Box>
                    </Box>
                </Container>
            </Hidden>
        </React.Fragment>
    )
}


export default Home;

