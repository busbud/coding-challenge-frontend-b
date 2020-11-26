import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Content from './Content/Content';
import './App.scss';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
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
                            {/**/}
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Find Schedules
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div className={classes.pad} />
                <Content />
            </div>
        </>
    );
};

export default app;
