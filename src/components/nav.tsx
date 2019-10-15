import React from 'react';
import {Button, makeStyles, Theme} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import Box from "@material-ui/core/Box";
import {useDispatch, useSelector} from "react-redux";
import {setLanguage} from "../store/actions";
import {State} from "../store/reducer";

const useStyles = makeStyles((theme: Theme) => {
    return {
        root: {
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            width: '100%',
            height: '50px',
            padding: theme.spacing(2, 0, 2, 0)
        }
    }
});


const Nav = () => {

    const language = useSelector((state: State) => state.language);
    const dispatch = useDispatch();
    const {i18n} = useTranslation();
    const classes = useStyles();

    const setColor = (lng:string) => language === lng ? 'secondary' : 'default';
    const setVariant = (lng:string) => language === lng ? 'outlined' : 'text';


    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        dispatch(setLanguage(lng));
    };


    return (
        <Box component={'nav'} className={classes.root}>
            <Button onClick={() => changeLanguage('fr')} variant={setVariant('fr')} color={setColor('fr')}>FR</Button>
            <Button onClick={() => changeLanguage('en')} variant={setVariant('en')} color={setColor('en')}>EN</Button>
        </Box>
    )
};

export default Nav;
