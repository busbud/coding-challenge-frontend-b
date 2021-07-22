import { Container, makeStyles } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Departure from '../src/components/Departure';
import Filter from '../src/components/Filter';
import LocaleChanger from '../src/components/LocaleChanger';
import translation from '../translation';

const useStyles = makeStyles((theme) => ({
	main: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
	},
	spaceTop: {
		marginTop: theme.spacing(3),
	},
	paper: {
		background: '#fff',
		padding: 20,
		borderRadius: 10,
		boxShadow:
			'0px 6px 12px rgb(32 65 90 / 10%), 0px 1px 4px rgb(32 65 90 / 10%)',
	},
	buttons: {
		border: 1,
		marginBottom: 10,
	},
}));

export default function Home({ data }: any) {
	const classes = useStyles();
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const {
		query: { origin, destination, date },
		locale,
	} = router;
	const translationData = translation[locale!];
	React.useEffect(() => {
		setLoading(false);
	}, [data]);
	return (
		<React.Fragment>
			<Container component='main' maxWidth='md'>
				<div className={classes.main}>
					<div className={classes.buttons}>
						<LocaleChanger />
					</div>
					<div className={classes.paper}>
						<Filter
							onFilterChange={(origin, destination, date) => {
								setLoading(true);
								router.push({
									query: {
										origin,
										destination,
										date,
									},
								});
							}}
							loading={loading}
						/>
					</div>
				</div>
			</Container>
			{data && data.length ? (
				<Container component='main' maxWidth='md' className={classes.spaceTop}>
					{data.map((dep: any, index: number) => {
						return <Departure key={index} {...dep} />;
					})}
				</Container>
			) : (
				<Container component='main' maxWidth='md' className={classes.spaceTop}>
					<Alert severity='warning'>
						{origin && destination && date
							? translationData.NO_DATA_FOUND
							: translationData.SELECT_YOUR_PREFERENCES}
					</Alert>
				</Container>
			)}
		</React.Fragment>
	);
}
const makeRequest = async (url: string) => {
	const { data } = await axios.get(url, {
		headers: {
			'X-Busbud-Token': process.env.BUSBUD_TOKEN,
		},
	});
	return data;
};

const initializeRequest = async (
	origin: string,
	destination: string,
	date: string
) => {
	let url = `https://napi.busbud.com/x-departures/${origin}/${destination}/${date}/`;
	return makeRequest(url);
};

const makePollRequest = async (
	origin: string,
	destination: string,
	date: string,
	index: number
) => {
	let url = `https://napi.busbud.com/x-departures/${origin}/${destination}/${date}/poll?index=${index}`;
	return makeRequest(url);
};
export const getServerSideProps: GetServerSideProps = async (context) => {
	const {
		query: { origin, destination, date },
	} = context;
	if (origin && destination && date) {
		let { cities, locations, departures, operators, complete } =
			await initializeRequest(
				origin.toString(),
				destination.toString(),
				date.toString()
			);

		while (!complete) {
			const data = await makePollRequest(
				origin.toString(),
				destination.toString(),
				date.toString(),
				departures.length
			);
			departures = [...departures, data.departures];
			operators = [...operators, data.operators];
			complete = data.complete;
		}
		const finalDep = departures.map((dep: any) => {
			const originLocation = locations.find(
				(l: any) => l.id == dep.origin_location_id
			);
			const destLocation = locations.find(
				(l: any) => l.id == dep.destination_location_id
			);
			const operator = operators.find((o: any) => o.id == dep.operator_id);
			return {
				logo: operator.logo_url,
				currency: dep.prices.currency,
				originTime: dep.departure_time,
				originCity: cities[0].name,
				originLocation: originLocation.name,
				destinationTime: dep.arrival_time,
				destinationCity: cities[1].name,
				destinationLocation: destLocation.name,
				duration: dep.duration,
				price: dep.prices.total,
			};
		});
		return {
			props: {
				data: finalDep,
			},
		};
	}
	return { props: {} };
};
