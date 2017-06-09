var React = require('react');

class Search extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			departure: 'New York, New York, United States',
			arrival: 'Montreal, Quebec, Canada',
			date: '2017-07-29',
			adult: 1
		};
	}
	render() {
		var {departure, arrival, date, adult} = this.state;
		return (
			<section className='search'>
				<div className='search-container'>
					<div className='search-item'>
						<i className="search-item-icon fa fa-location-arrow" aria-hidden="true"></i>
						{departure}
					</div>
					<div className='search-item'>
						<i className="search-item-icon fa fa-map-marker" aria-hidden="true"></i>
						{arrival}
					</div>
					<div className='search-item'>
						<i className="search-item-icon fa fa-calendar-o" aria-hidden="true"></i>
						{date}
					</div>
					<div className='search-item'>
						<i className="search-item-icon fa fa-user" aria-hidden="true"></i>
						{adult}
					</div>
				</div>
				<button className='btn'>Search for busses</button>
			</section>
		);
	}
}

module.exports = Search;