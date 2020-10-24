import React, { useState, useEffect } from 'react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
	const [data, setData] = useState({
		departures: [
			getPlaceholderData(),
			getPlaceholderData(),
			getPlaceholderData(),
			getPlaceholderData(),
			getPlaceholderData(),
		]
	});

	useEffect(() => {
		async function fetchData() {
			const data = await postData('https://napi.busbud.com/x-departures/f2m673/f25dvk/2020-12-01?adult=1&child=0&senior=0&lang=en&currency=EUR');
			console.log('data', data);
			setData(data);
		}

		// fetchData();
	}, []);

	return (
		<div className="app text-center">
			<header className="app-header mt-5">
				<h1 className="title">
					<div className="mb-2">Going to</div>
					<img
						src="https://cloud.githubusercontent.com/assets/1574577/12971188/13471bd0-d066-11e5-8729-f0ca5375752e.png"
						alt="OSHEAGA"
						className="logo"
					/>
					<div>from Quebéc?</div>
				</h1>

				<h2 className="mt-5">Bus Schedules</h2>

				<ul className="list-schedules">
					{data && data.departures.map((departure, index) => {
						return (
							<li key={index}>
								<div className="card p-3 mb-3 text-left">
									<div className="d-flex justify-content-between">
										<div>
											<h4 className="mb-0">Departure</h4>
											<strong className="date">{formatDate(departure.departure_time)}</strong><br />
											<span className="location">
												Montréal <br />
												<small>
													(
														{data.locations && data.locations.find((location) => {
															return location.id === departure.origin_location_id;
														}).name}

														{!data.locations && '---------------'}
													)
												</small>
											</span>
										</div>

										<div className="flex-grow-1 mr-2 ml-2">
											<div className="arrow d-flex">
												<div className="line flex-grow-1"></div>
												&gt;

												<span className="duration badge badge-pill">
													{departure.duration} min
												</span>
											</div>
										</div>

										<div>
											<h4 className="mb-0">Arrival</h4>
											<strong className="date">{formatDate(departure.arrival_time)}</strong><br />

											<span className="location">
												Québec <br />
												<small>
													(
														{data.locations && data.locations.find((location) => {
															return location.id === departure.destination_location_id;
														}).name}

														{!data.locations && '---------------'}
													)
												</small>
											</span>
										</div>
									</div>

									<div className="d-flex justify-content-between flex-row align-items-baseline">
										<div>
											<div className="duration">Duration: {departure.duration} min</div>
										</div>

										<h4 className="mb-0">
											<span className="text-success">{departure.prices.currency} {departure.prices.total}</span>
										</h4>
									</div>
								</div>
							</li>
						)
					})}
				</ul>
			</header>
		</div>
	);
}

// Example POST method implementation:
async function postData(url = '') {
	// Default options are marked with *
	const response = await fetch(url, {
		method: 'GET', // *GET, POST, PUT, DELETE, etc.
		mode: 'cors', // no-cors, *cors, same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'same-origin', // include, *same-origin, omit
		headers: {
			// 'Content-Type': 'application/json',
			'X-Busbud-Token': 'PARTNER_BaASYYHxTxuOINEOMWq5GA',
			'Accept': 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
		redirect: 'follow', // manual, *follow, error
		referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		// body: JSON.stringify(data) // body data type must match "Content-Type" header
	});

	return response.json(); // parses JSON response into native JavaScript objects
}

function formatDate(string) {
	let date = string.split('T')[0];
	const time = string.split('T')[1];

	date = date.split('-').reverse().join('/');

	return date + ' ' + time;
}

function getPlaceholderData() {
	return {
		departure_time: '−−−−-−−-−−T−−:−−:−−',
		arrival_time: '−−−−-−−-−−T−−:−−:−−',
		prices: {
			total: '-.--',
			currency: '---',
		},
		duration: '---',
	};
}

export default App;


// −
// -
// ﹣