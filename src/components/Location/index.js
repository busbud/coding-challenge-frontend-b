import './index.scss';

function ListSchedules(params) {
	return (
		<span className="location">
			{params.city} <br />
			<small>
				(
					{params.locations && params.locations.find((location) => {
						return location.id === params.id;
					}).name}

					{!params.locations && '_________'}
				)
			</small>
		</span>
	);
}

export default ListSchedules;
