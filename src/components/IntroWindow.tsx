import React from 'react';

import {useTranslation} from "react-i18next";
import {makeStyles, Theme, Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import withStyles from "@material-ui/core/styles/withStyles";

const useStyles = makeStyles((theme: Theme) => {
    return {
        logo: {
            margin: '0 auto',
            [theme.breakpoints.up('md')]: {
                margin: '0'
            }
        },
        paper: {
            padding: theme.spacing(1, 0, 0, 0)
        }
    }
});

const GridWithResponsiveSpacing = withStyles((theme: Theme) => ({
    root: {
        margin: theme.spacing(1, 0, 1, 0),
        [theme.breakpoints.up('md')]: {
            margin: theme.spacing(4, 0, 4, 0),
        }
    }
}))(Grid);

const IntroWindow = () => {

    const {t} = useTranslation();
    const classes = useStyles();


    return (
        <Grid container direction={'column'}>
            <GridWithResponsiveSpacing container>
                <Grid className={classes.logo} item md={8} sm={6} xs={10}>
                    <img width="100%" height="100%" src="/static/logo.png" alt=""/>
                </Grid>
            </GridWithResponsiveSpacing>
            <GridWithResponsiveSpacing item md={10} xs={12}>
                <Typography variant={'h4'}>{t('landing_header')}</Typography>
            </GridWithResponsiveSpacing>
            <GridWithResponsiveSpacing item>
                <Typography variant={'subtitle2'}>
                    {t('landing_credit')}&nbsp;
                    <Link href={'https://www.busbud.com/'} color={'secondary'}
                          variant={'subtitle2'}>
                        Busbud
                    </Link>
                </Typography>
            </GridWithResponsiveSpacing>
        </Grid>
    )
};

export default IntroWindow;
