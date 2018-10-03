import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    icon : {
        verticalAlign: 'middle'
    }
}

const ContainerDetails = props => {
    const { classes } = props;
    const operator = props.data.operators.filter(operator => operator.id === props.departure.operator_id)
    return <Grid container spacing={8}
        direction="row"
        justify="flex-start"
        alignItems="center">
        <Grid item xs={6} sm={3}>
            <Typography gutterBottom variant="caption">
            <Icon className={classes.icon}>directions_bus</Icon>
                {operator[0].name}
            </Typography>
        </Grid>
        <Grid item xs={6} sm={3}>
            <Typography gutterBottom variant="caption">
                <Icon className={classes.icon}>av_timer</Icon>
                {parseInt(props.departure.duration / 60)}h{parseInt(props.departure.duration % 60)}min
            </Typography>
        </Grid>

    </Grid>;
}

export default withStyles(styles)(ContainerDetails);