import { makeStyles, Typography } from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import TimelapseIcon from '@material-ui/icons/Timelapse';
import Image from 'next/image';

const useStyles = makeStyles((theme) => ({
	spaceTop: {
		marginTop: theme.spacing(2),
	},
	wrapper: {
		borderRadius: 10,
		background: 'white',
		marginTop: theme.spacing(2),
		padding: 14,
		boxShadow:
			'0px 2px 4px rgb(32 65 90 / 10%), 0px 1px 1px rgb(32 65 90 / 10%)',
	},
	header: {
		display: 'flex',
		justifyContent: 'space-between',
	},
	logo: {
		height: 30,
	},
	price: {
		color: '#0271CA',
	},
	departureWrapper: {
		marginTop: theme.spacing(2),
	},
	departureOrigin: {
		display: 'flex',
		flexWrap: 'nowrap',
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'flex-start',
	},
	departureDestination: {
		display: 'flex',
		flexWrap: 'nowrap',
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'flex-start',
	},
	departureTime: {
		fontWeight: 'bold',
		marginRight: 10,
		color: '#0271CA',
		whiteSpace: 'nowrap',
	},
	departureCity: {
		whiteSpace: 'nowrap',
		fontWeight: 'bold',
	},
	departureLocation: {
		marginLeft: 5,
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
	},
	footer: {
		marginTop: theme.spacing(2),
	},
	footerTime: {
		display: 'flex',
	},
	footerTimeIcon: {
		marginRight: 5,
		color: 'orange',
		fontSize: 20,
	},
	departureIcon: {
		marginRight: 5,
		fontSize: 12,
		color: 'orange',
	},
	departureIconPath: {
		color: '#848484',
		fontSize: 6,
	},
	departurePath: {
		display: 'flex',
		flexDirection: 'column',
		paddingLeft: 3,
	},
}));

type DepartureProps = {
	logo: string;
	currency: string;
	price: number;
	originTime: string;
	originCity: string;
	originLocation: string;
	destinationTime: string;
	destinationCity: string;
	destinationLocation: string;
	duration: number;
};

function getTimeOnly(dateStr: string) {
	const date = new Date(dateStr);
	return `${String(date.getHours()).padStart(2, '0')}:${String(
		date.getMinutes()
	).padStart(2, '0')}`;
}

export default function Departure(props: DepartureProps) {
	const classes = useStyles();
	return (
		<div className={classes.wrapper}>
			<div className={classes.header}>
				<Image
					className={classes.logo}
					alt={props.originCity}
					height={30}
					width={145}
					src={props.logo}
				/>
				<Typography color='secondary' className={classes.price} variant='h6'>
					{props.currency} {props.price}
				</Typography>
			</div>
			<div className={classes.departureWrapper}>
				<div className={classes.departureOrigin}>
					<MyLocationIcon className={classes.departureIcon} />
					<span className={classes.departureTime}>
						{getTimeOnly(props.originTime)}
					</span>
					<span className={classes.departureCity}>{props.originCity} - </span>
					<span className={classes.departureLocation}>
						{props.originLocation}
					</span>
				</div>
				<div className={classes.departurePath}>
					<FiberManualRecordIcon className={classes.departureIconPath} />
					<FiberManualRecordIcon className={classes.departureIconPath} />
				</div>
				<div className={classes.departureDestination}>
					<LocationOnIcon className={classes.departureIcon} />
					<span className={classes.departureTime}>
						{getTimeOnly(props.destinationTime)}
					</span>
					<span className={classes.departureCity}>
						{props.destinationCity} -{' '}
					</span>
					<span className={classes.departureLocation}>
						{props.destinationLocation}
					</span>
				</div>
			</div>
			<div className={classes.footer}>
				<div className={classes.footerTime}>
					<TimelapseIcon className={classes.footerTimeIcon} />
					<span>
						{` ${Math.floor(props.duration / 60)}h ${props.duration % 60}m`}
					</span>
				</div>
			</div>
		</div>
	);
}
