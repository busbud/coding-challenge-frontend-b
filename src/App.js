import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
	return (
		<div className="App text-center">
			<header className="App-header">
				<h1>
					<div className="mb-2">Going to</div>
					<img
						src="https://cloud.githubusercontent.com/assets/1574577/12971188/13471bd0-d066-11e5-8729-f0ca5375752e.png"
						alt="OSHEAGA"
					/>
					<div>from Quebéc?</div>
				</h1>
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

postData('https://napi.busbud.com/x-departures/f2m673/f25dvk/2021-08-01')
	.then(data => {
		console.log(data); // JSON data parsed by `data.json()` call
	});

export default App;
