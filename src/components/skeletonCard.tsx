import React from 'react';
import {makeStyles, Theme} from "@material-ui/core";

import Skeleton from '@material-ui/lab/Skeleton';
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";


const useStyles = makeStyles((theme: Theme) => {
    return {
        paper: {
            margin: theme.spacing(1, 0, 2, 0),
            padding: theme.spacing(1)
        },
        skeletonReset: {
            margin: theme.spacing(0),
            padding: theme.spacing(0),
            height: 18
        },
        skeletonCircle: {
            marginRight: theme.spacing(1)
        }

    }
});


const SkeletonCard = () => {

    const classes = useStyles();


    return (
        <Paper elevation={2} className={classes.paper}>
            <Box mb={1} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                <Skeleton className={classes.skeletonReset} variant={'rect'} width={130}/>
                <Skeleton className={classes.skeletonReset} width={70}/>
            </Box>
            <Box mb={1} display={'flex'} alignItems={'center'}>
                <Skeleton className={`${classes.skeletonReset} ${classes.skeletonCircle}`} variant={'circle'} width={18} />
                <Skeleton className={classes.skeletonReset} width={250}/>
            </Box>
            <Box mb={1} display={'flex'} alignItems={'center'}>
                <Skeleton className={`${classes.skeletonReset} ${classes.skeletonCircle}`} variant={'circle'} width={18} />
                <Skeleton className={classes.skeletonReset} width={250}/>
            </Box>
            <Box mb={1} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                <Skeleton className={classes.skeletonReset} width={100}/>
                <Skeleton className={classes.skeletonReset} variant='rect' width={90}/>
            </Box>

        </Paper>
    )
};

export default SkeletonCard;
