import React, { useState, useEffect } from 'react';
import './App.scss';
import ListSchedules from '../ListSchedules';
import translations from '../../helpers/translations';

function App() {
	const [departures, setDepartures] = useState([
		getPlaceholderData(),
		getPlaceholderData(),
		getPlaceholderData(),
		getPlaceholderData(),
		getPlaceholderData(),
	]);

	const [locations, setLocations] = useState();
	const [lang, setLang] = useState('en');

	const url = 'https://napi.busbud.com/x-departures/f2m673/f25dvk/2020-12-01';
	const query = `?adult=1&child=0&senior=0&lang=${lang}&currency=CAD`;

	useEffect(() => {
		fetchData();
	}, []);

	function changeLang(lang) {
		setLang(lang);
		fetchData();
	}

	function checkData(data) {
		if (!data.complete) {
			const length = data.departures.length;

			setTimeout(async () => {
				const newData = await getData(url + '/poll' + query + '&index=' + length);

				setDepartures(departures.concat(newData.departures));
				setLocations(locations.concat(newData.locations));

				checkData(newData);
			}, 2000);
		}
	}

	async function fetchData() {
		const data = await getData(url + query);

		console.log('data', data);

		setDepartures(data.departures);
		setLocations(data.locations);

		checkData(data);
	}

	return (
		<div className="app text-center mt-5 mb-5">
			<header className="app-header">
				<h1 className="title">
					<div className="mb-2">
						{translations[lang].title1}
					</div>
					<img
						src="https://cloud.githubusercontent.com/assets/1574577/12971188/13471bd0-d066-11e5-8729-f0ca5375752e.png"
						alt="OSHEAGA"
						className="logo"
					/>
					<div>{translations[lang].title2}</div>
				</h1>
			</header>

			<button className="btn" onClick={(e) => changeLang('en')}>EN</button> | {/* */}
			<button className="btn" onClick={(e) => changeLang('fr')}>FR</button>

			<h2 className="mt-5">{translations[lang].subtitle}</h2>

			<ListSchedules
				departures={departures}
				locations={locations}
				lang={lang}
			/>
		</div>
	);
}

async function getData(url = '') {
	const response = await fetch(url, {
		method: 'GET',
		mode: 'cors',
		cache: 'no-cache',
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
		duration: '__',
	};
}

function getPlaceholderDate() {
	return '____-__-__T_:_:__';
}

export default App;
