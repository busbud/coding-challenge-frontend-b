import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

interface ScheduleItemProps {
    data?: any;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            // flexGrow: 1,
        },
        paper: {
            flexGrow: 1,
            padding: theme.spacing(2),
            marginTop: 10,
            marginRight: 10,
            marginLeft: 10,
        },
    })
);

function scheduleItem(props: ScheduleItemProps) {
    const classes = useStyles();
    const { data } = props;
    console.log(data);
    return (
        <div className={classes.root}>
            <Grid container>
                <Paper className={classes.paper}>
                    <Grid container justify="space-around">
                        <Grid item xs={10}>
                            <Grid container justify="space-around">
                                <Grid item xs={12} sm={6}>
                                    {data.departureHour} - {data.originCity} -{' '}
                                    {data.locationOriginName}
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    {data.arrivalHour} - {data.destinationCity} -{' '}
                                    {data.locationDestinationName}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={2}>
                                ${data.price}
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </div>
    );
}

export default React.memo(scheduleItem);
