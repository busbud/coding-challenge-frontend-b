import React from 'react'

const ResultList = ({departures}) => (
	<ul>
		{/* eslint-disable camelcase */departures.map(({
			arrival_time,
			busbud_departure_id,
			departure_time,
			destination_location,
			origin_location,
			prices
		}) => (
			<li key={busbud_departure_id}>
				{busbud_departure_id}
				<div>departureTime: {departure_time}</div>
				<div>arrivalTime: {arrival_time}</div>
				<div>originLocation: {origin_location.name}</div>
				<div>destinationLocation: {destination_location.name}</div>
				the location name
				<div>price: {prices.total}</div>
				</li>
		))/* eslint-enable camelcase */}
	</ul>
)

export default ResultList
