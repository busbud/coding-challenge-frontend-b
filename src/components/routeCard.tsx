import React from 'react';
import {Button, makeStyles, Paper, Theme, Typography} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import {Departure} from "../store/reducer";
import moment from 'moment'
import {Flipped} from "react-flip-toolkit";


const useStyles = makeStyles((theme: Theme) => {
    return {
        durationStyles: {
            fill: theme.palette.text.secondary
        },
        supStyles: {
            position: 'absolute',
            top: '4px',
            left: '11px',
            fontSize: '60%',
            lineHeight: '0'
        },
        paper: {
            margin: theme.spacing(1, 0, 2, 0),
            padding: theme.spacing(1)
        }
    }
});


const RouteCard = (props: { departure: Departure }) => {

    const {departure} = props;
    const classes = useStyles();

    const min = departure.duration % 60;
    const formatMin = min < 10 ? `0${min}` : min;


    return (
        <Flipped flipId={departure.id}>
            <Paper elevation={2} className={classes.paper}>
                <Box mb={1} display='flex' justifyContent='space-between'>
                    <img width={130} height={25} src={departure.operator_logo} alt=""/>
                    <Box>
                        <Typography color={'secondary'}
                                    variant={'h6'}>CA${Math.round(departure.price / 100)}</Typography>
                    </Box>
                </Box>
                <Box mb={1} display={'flex'}>
                    <Box>
                        <svg className="d-block departure-card--trip-icons" preserveAspectRatio="xMidYMid meet"
                             viewBox="0 0 14 48"
                             width="14px" height="50px">
                            <g>

                                <svg y="3" viewBox="0 0 24 24" width="16" height="16">
                                    <path
                                        color="rgba(255, 92, 96, .54)" fill="rgba(255, 92, 96, .54)"
                                        d="M12 4a8 8 0 1 0 8 8 8.024 8.024 0 0 0-8-8zm0 11.5a3.5 3.5 0 1 1 3.5-3.5 3.543 3.543 0 0 1-3.5 3.5z"/>
                                </svg>
                                <line x1="8" y1="18.5" x2="8" y2="32" strokeWidth="2" strokeDasharray="2,3"
                                      strokeLinecap="round"
                                      stroke="rgba(10,59,95,.35)"/>

                                <svg y="32" viewBox="0 0 24 24" width="16" height="16">
                                    <path color="rgba(10,59,95,.35)" fill="rgba(10,59,95,.35)"
                                          d="M12 2a8.024 8.024 0 0 0-8 8c0 4.4 6 12 8 12s8-7.6 8-12a8.024 8.024 0 0 0-8-8zm0 11.5a3.5 3.5 0 1 1 3.5-3.5 3.543 3.543 0 0 1-3.5 3.5z"/>
                                </svg>
                            </g>
                        </svg>
                    </Box>
                    <Box ml={1} display={'flex'} flexDirection={'column'}>
                        <Box display={'flex'} alignItems={'baseline'}>
                            <Typography style={{fontWeight: 500}} variant={'subtitle1'}
                                        color={'secondary'}>{moment(departure.departure_time).format('hh:mma')}</Typography>
                            <Box ml={1} mr={1}>
                                <Typography
                                    variant={'body1'}>{`${departure.departure_city} -`}</Typography>
                            </Box>
                            <Typography variant={'body2'}>{departure.departure_location}</Typography>
                        </Box>
                        <Box display={'flex'} alignItems={'baseline'}>
                            <Typography style={{fontWeight: 500}} variant={'subtitle1'}
                                        color={'textSecondary'}>{moment(departure.arrival_time).format('hh:mma')}</Typography>
                            <Box ml={1} mr={1}>
                                <Typography
                                    color={'textSecondary'}
                                    variant={'body1'}>{`${departure.arrival_city} -`}</Typography>
                            </Box>
                            <Typography color={'textSecondary'}
                                        variant={'body2'}>{departure.arrival_location}</Typography>
                        </Box>
                    </Box>
                </Box>
                <Box display={'flex'} justifyContent={'space-between'}>
                    <Box display={'flex'} alignItems={'center'}>
                        <Box display={'flex'} alignItems={'baseline'} mr={0.5}>
                            <svg className={classes.durationStyles} preserveAspectRatio="xMidYMid meet" height={24}
                                 width={24} viewBox="0 0 24 24">
                                <path
                                    d="M5.302 15.776a1.64 1.64 0 1 1 1.64 1.64 1.64 1.64 0 0 1-1.64-1.64zm10.65 1.64a1.64 1.64 0 1 0-1.64-1.64 1.64 1.64 0 0 0 1.64 1.64zM22.1 9.6v4.9a1.58 1.58 0 0 1-1.6 1.6h-2.1v-.4a2.393 2.393 0 0 0-2.4-2.5 2.476 2.476 0 0 0-2.5 2.5v.4H9.3v-.4a2.456 2.456 0 0 0-2.4-2.5 2.456 2.456 0 0 0-2.4 2.5v.3a3.767 3.767 0 0 1-1.59-.835A3.263 3.263 0 0 1 2 12.9V8a1.58 1.58 0 0 1 1.6-1.6H19a3.51 3.51 0 0 1 1.676.447A2.872 2.872 0 0 1 22.1 9.6zM7.3 8.1H3.6a.43.43 0 0 0-.4.4v3.3a.43.43 0 0 0 .4.4h3.7zm4.9 0H8.1v4.1h4.1zm4.9 0H13v4.1h4.1zm3.8 5.7V9.3c0-.453-.326-1.2-1.6-1.2H18v4.2a1.923 1.923 0 0 1 1.1 1.5z"/>
                            </svg>
                        </Box>
                        <Typography color='textSecondary'
                                    variant={'body2'}>{`${Math.floor(departure.duration / 60)}h ${formatMin}m`}</Typography>
                        <Box position={'relative'}
                             display={moment(departure.arrival_time).isAfter(departure.departure_time, 'day') ? 'flex' : 'none'}
                             alignItems={'center'}
                             ml={1}>
                            <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" height={16} width={16}
                                 className={classes.durationStyles}>
                                <path
                                    d="M13.063 22a9.98 9.98 0 0 0 7.768-3.703.47.47 0 0 0-.452-.756 7.834 7.834 0 0 1-5.342-14.506.47.47 0 0 0-.147-.868A10 10 0 1 0 13.063 22z"/>
                            </svg>
                            <Typography color='textSecondary' className={classes.supStyles}>+1</Typography>
                        </Box>
                    </Box>
                    <Box>
                        <Button variant={'contained'} color={'secondary'}>SELECT</Button>
                    </Box>
                </Box>
            </Paper>
        </Flipped>
    )
};

export default RouteCard;
