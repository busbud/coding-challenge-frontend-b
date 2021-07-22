import { Button, Grid, makeStyles, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useRouter } from 'next/router';
import React, { useReducer } from 'react';
import translation from '../../translation';
const cities = [
	{
		title: 'Québec',
		geoHash: 'f2m673',
	},
	{
		title: 'Montréal',
		geoHash: 'f25dvk',
	},
];

interface FilterProps {
	onFilterChange: (origin: string, destination: string, date: string) => void;
	loading: boolean;
}

const Filter = (props: FilterProps) => {
	const [filter, setFilter] = useReducer(
		(state: any, nstate: any) => {
			return { ...state, ...nstate };
		},
		{
			origin: cities[0],
			destination: cities[1],
			date: new Date().toISOString().substr(0, 10),
		}
	);
	const router = useRouter();
	const { locale } = router;
	const translationData = translation[locale!];
	return (
		<Grid container spacing={3}>
			<Grid item xs={12} md={3}>
				<Autocomplete
					id='origin'
					options={cities}
					onChange={(event: any, value: any) => {
						setFilter({ origin: value });
					}}
					value={filter.origin}
					getOptionLabel={(option) => option.title}
					renderInput={(params) => (
						<TextField
							{...params}
							variant='outlined'
							fullWidth
							size='small'
							label='Origin'
						/>
					)}
				/>
			</Grid>
			<Grid item xs={12} md={3}>
				<Autocomplete
					id='destination'
					options={cities}
					onChange={(event: any, value: any) => {
						setFilter({ destination: value });
					}}
					value={filter.destination}
					getOptionLabel={(option) => option.title}
					renderInput={(params) => (
						<TextField
							{...params}
							variant='outlined'
							fullWidth
							size='small'
							label='Destination'
						/>
					)}
				/>
			</Grid>
			<Grid item xs={12} md={3}>
				<TextField
					variant='outlined'
					fullWidth
					size='small'
					id='date'
					value={filter.date}
					onChange={(event) => {
						setFilter({ date: event.target.value });
					}}
					type='date'
					label='Date'
					name='date'
				/>
			</Grid>
			<Grid item xs={12} md={3}>
				<Grid container justifyContent='flex-end'>
					<Button
						variant='contained'
						color='primary'
						disabled={props.loading}
						disableElevation
						onClick={() => {
							if (filter.origin && filter.destination && filter.date) {
								props.onFilterChange(
									filter.origin.geoHash,
									filter.destination.geoHash,
									filter.date
								);
							}
						}}
					>
						{translationData.FIND_DEPARTURES}
					</Button>
				</Grid>
			</Grid>
		</Grid>
	);
};
export default Filter;
