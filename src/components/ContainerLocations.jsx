import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';

const ContainerLocations = props => {
    const { classes } = props;
    return <Grid container spacing={8}
        direction="row"
        justify="space-between"
        alignItems="center">
        <Grid item xs={11} sm={5}>
            <Typography gutterBottom variant="caption">
                {props.originCity[0].name}
            </Typography>
            <Typography gutterBottom variant="subheading">
                {props.originLocation[0].name}
            </Typography>
        </Grid>
        <Grid item xs={1} sm={1}>
            <Typography gutterBottom variant="headline">
                <Icon className={props.classes.arrow}>arrow_right</Icon>
            </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
            <Typography gutterBottom variant="caption">
                {props.destinationCity[0].name}
            </Typography>
            <Typography gutterBottom variant="subheading">
                {props.destinationLocation[0].name}
            </Typography>
        </Grid>
        <Grid item xs={12} sm={2}>
            <Button
                size="medium"
                variant="contained"
                color="primary"
                fullWidth
                className={classes.button}>Select</Button>
        </Grid>
    </Grid>;
}

export default ContainerLocations;