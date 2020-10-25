import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import ListSchedules from '../ListSchedules';

function App() {
	const [departures, setDepartures] = useState([
		getPlaceholderData(),
		getPlaceholderData(),
		getPlaceholderData(),
		getPlaceholderData(),
		getPlaceholderData(),
	]);

	const [locations, setLocations] = useState();

	useEffect(() => {
		function checkData(data, url, query) {
			if (!data.complete) {
				const length = data.departures.length;

				setTimeout(async () => {
					const newData = await getData(url + '/poll' + query + '&index=' + length);

					console.log('newData', newData);

					setDepartures(departures.concat(newData.departures));
					setLocations(locations.concat(newData.locations));

					checkData(newData, url, query);
				}, 2000);
			}
		}

		async function fetchData() {
			const url = 'https://napi.busbud.com/x-departures/f2m673/f25dvk/2020-12-01';
			const query = '?adult=3&child=0&senior=0&lang=fr&currency=CAD';

			const data = await getData(url + query);

			setDepartures(data.departures);
			setLocations(data.locations);

			checkData(data, url, query);
		}

		fetchData();
	}, []);

	return (
		<div className="app text-center mt-5 mb-5">
			<header className="app-header">
				<h1 className="title">
					<div className="mb-2">Going to</div>
					<img
						src="https://cloud.githubusercontent.com/assets/1574577/12971188/13471bd0-d066-11e5-8729-f0ca5375752e.png"
						alt="OSHEAGA"
						className="logo"
					/>
					<div>from Quebéc?</div>
				</h1>
			</header>

			<div className="languages">
				<a>EN</a> | <a>FR</a>
			</div>

			<h2 className="mt-5">Bus Schedules</h2>

			<ListSchedules departures={departures} locations={locations}/>
		</div>
	);
}

async function getData(url = '') {
	const response = await fetch(url, {
		method: 'GET',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: {
			'X-Busbud-Token': 'PARTNER_BaASYYHxTxuOINEOMWq5GA',
			'Accept': 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
		},
		referrerPolicy: 'no-referrer',
	});

	return response.json();
}

function getPlaceholderData() {
	return {
		departure_time: getPlaceholderDate(),
		arrival_time: getPlaceholderDate(),
		prices: {
			total: '_.__',
			currency: '___',
		},
		duration: '___',
	};
}

function getPlaceholderDate() {
	return '____-__-__T_:_:__';
}

export default App;
