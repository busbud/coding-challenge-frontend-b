import * as React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Content from './Content/Content';
import './App.scss';
import InputBase from '@material-ui/core/InputBase';
import { supportedLanguages } from '../utils/language';
import { goToLanguage } from '../store/router/actions';
import { useDispatch, useSelector } from 'react-redux';
import { selectSchedulesFromState } from '../store/schedules/selectors';
import { selectLanguageFromState } from '../store/language/selectors';

const BootstrapInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);

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
    const dispatch = useDispatch();
    const { language } = useSelector(selectLanguageFromState);
    const [displayedLanguage, setDisplayedLanguage] = React.useState(language);

    const handleLanguageChange = (event: any) => {
        const newLanguage = event?.target?.value;
        dispatch(goToLanguage(newLanguage));
        setDisplayedLanguage(newLanguage);
    };

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
                <Content />
            </div>
        </>
    );
};

export default app;
