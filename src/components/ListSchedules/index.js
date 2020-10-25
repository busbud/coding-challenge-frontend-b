import './ListSchedules.scss';
import Location from '../Location';
import translations from '../../helpers/translations';

function ListSchedules(params) {
	const departures = params.departures;
	const locations = params.locations;
	const lang = params.lang;

	return (
		<ul className="list-schedules">
			{departures.map((departure, index) => {
				return (
					<li key={index}>
						<a className="card p-3 mb-3 text-left" href={departure.links ? departure.links.deeplink : '#'}>
							<div className="d-flex justify-content-between">
								<div>
									<img
										src="/img/icon-onbus.png"
										alt="OSHEAGA"
										className="icon"
									/><br />

									<strong className="date">{formatDate(departure.departure_time).date}</strong><br />
									<strong className="time">{formatDate(departure.departure_time).time}</strong><br />

									<Location
										city="Montréal"
										id={departure.origin_location_id}
										locations={locations}
									/>
								</div>

								<div className="flex-grow-1 mr-2 ml-2 text-center">
									<img
										src="/img/shuttle.png"
										alt="OSHEAGA"
										className="shuttle"
									/>

									<div className="arrow d-flex">
										<div className="line flex-grow-1"></div>
										&gt;

										<span className="duration badge badge-pill">
											{departure.duration} min
										</span>
									</div>
								</div>

								<div>
									<img
										src="/img/icon-offbus.png"
										alt="OSHEAGA"
										className="icon"
									/><br />

									<strong className="date">{formatDate(departure.arrival_time).date}</strong><br />
									<strong className="time">{formatDate(departure.arrival_time).time}</strong><br />

									<Location
										city="Québec"
										id={departure.destination_location_id}
										locations={locations}
									/>
								</div>
							</div>

							<div className="d-flex justify-content-between flex-row align-items-baseline">
								<div>
									<div className="duration">{translations[lang].duration}: {departure.duration} min</div>
								</div>

								<h4 className="mb-0">
									<span className="text-success">
										{departure.prices.currency} {typeof departure.prices.total === 'number' ? departure.prices.total / 100 : departure.prices.total}
									</span>
								</h4>
							</div>
						</a>
					</li>
				)
			})}
		</ul>
	);
}

function formatDate(string) {
	let date = string.split('T')[0];
	let time = string.split('T')[1];

	date = date.split('-').reverse().join('/');

	time = time.split(':');
	time = time[0] + ':' + time[1];

	return {
		date,
		time,
	};
}

export default ListSchedules;
