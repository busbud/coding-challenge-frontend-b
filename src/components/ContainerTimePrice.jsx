import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';

const ContainerTimePrice = props => {
    return <Grid container spacing={8}
        direction="row"
        justify="space-between"
        alignItems="center">
        <Grid item xs={8}>
            <Typography gutterBottom variant="headline">
                {props.departureHours}:{props.departureMinutes}<Icon className={props.classes.arrow}>arrow_right</Icon>{props.arrivalHours}:{props.arrivalMinutes}
            </Typography>
        </Grid>
        <Grid item xs={2}>
            <Typography gutterBottom variant="headline" className={props.classes.price}>
                ${props.dep.prices.total / 100}
            </Typography>
        </Grid>
    </Grid>;
}

export default ContainerTimePrice;