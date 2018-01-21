import React from 'react'

import {formatPrice, formatTime, getDayDiff} from '../utils/formatters'

const ResultList = ({departures}) => (
	<ul>
		{/* eslint-disable camelcase */departures.map(({
			busbud_departure_id,
			arrival_time,
			departure_time,
			destination_location,
			origin_location,
			prices
		}) => {
			const dayDiff = getDayDiff(departure_time, arrival_time)
			return (
				<li key={busbud_departure_id}>
					<div>departure: {origin_location.name} at {formatTime(departure_time)}</div>
					<div>
						arrival: {destination_location.name} at {formatTime(arrival_time)}
						{dayDiff > 0 && <span>{`(+${dayDiff})`}</span>}
					</div>
					<div>price: CAD {formatPrice(prices.total)}</div>
				</li>
			)
		})/* eslint-enable camelcase */}
	</ul>
)

export default ResultList
