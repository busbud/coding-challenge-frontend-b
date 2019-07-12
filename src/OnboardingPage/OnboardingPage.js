import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import osheagaImage from '../img/13471bd0-d066-11e5-8729-f0ca5375752e.png';
import { withStyles, withTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { FormattedMessage } from 'react-intl';
import { injectIntl, FormattedDate } from 'react-intl';


const styles = theme => ({
    root: {
        flexGrow: 1,
        minHeight: '100vh',
        background: '#50c4c9',
        color: '#f2f2f2'
    },
    mainContainer: {
        padding: '2vw',
        minHeight: '100vh'
    },
    emboardingTextButton: {
        fontSize: '1rem',
        fontFamily: "'Montserrat'"
    },
    emboardingTextTitle: {
        fontWeight: 'bold',
        fontSize: '4.25rem',
        fontFamily: "'Catamaran'"
    },
    emboardingTextDesc: {
        padding: '2rem 5vw',
        fontFamily: "'Catamaran'"
    },
    logoImg: {
        maxWidth: '85vw'
    },
});

function OnboardingPage(props) {
    const { classes, date, intl } = props;

    const handleOnboarding = event => {
        // event is handled by parent component
        props.handleOnboarding();
    };

    return (
        <React.Fragment>
            <div className={classes.root}>
                <Grid container spacing={0} className={classes.mainContainer} >
                    <Grid item xs={12} justify="center" style={{ textAlign: "center" }} alignItems="center" >

                        <div>
                            <Typography component="h1" variant="h2" align="center" className={classes.emboardingTextTitle}>
                                {intl.formatMessage({ id: 'Onboarding.header' })}
                            </Typography>
                            <br />
                            <div><img src={osheagaImage} className={classes.logoImg} /></div>
                        </div>
                        <br />

                        <Typography variant="h5" align="center" component="p" className={classes.emboardingTextDesc}>
                            {intl.formatMessage({ id: 'Onboarding.desc' })}
                        </Typography>
                        <br />
                        <Fab fullWidth variant="extended" color="secondary" aria-label={intl.formatMessage({ id: 'Onboarding.action' })} onClick={handleOnboarding} className={classes.emboardingTextButton} >
                            &nbsp; <b>{intl.formatMessage({ id: 'Onboarding.action' })}</b> &nbsp;
                        </Fab>
                        <br /><br />
                    </Grid>
                </Grid>
            </div>
        </React.Fragment>
    );
}

OnboardingPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(injectIntl(OnboardingPage));

