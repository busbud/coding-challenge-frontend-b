var moment = require('moment');
var classNames = require('classnames');

var Result = React.createClass({

	// Get Resutls translations
	getTranslations: function() {
		var translations = {
			en: {
				per_person: 'Per person',
				buy: 'Buy',
				tv: 'TV',
				power_outlets: 'Power outlets',
				wifi: 'Wifi',
				ac: 'Air conditioning',
				duration: 'Duration:'
			},
			fr: {
				per_person: 'Par personne',
				buy: 'Magasiner',
				tv: 'TV',
				power_outlets: 'Prises de courant',
				wifi: 'Wifi',
				ac: 'Climatisation',
				duration: 'Dur&eacute;e :'
			}
		};
		return translations[this.props.lang];
	},

	// Render result
	render:function(){
		var translations = this.getTranslations();

		// Get operator's logo url
		var operator_logo = this.props.operator.logo_url;
		operator_logo = operator_logo.replace('{height}', 70).replace('{width}', 120);

		// Calculate time diff, between departure and arrival, in hours/minutes
		var time_diff = moment.utc(moment(this.props.arrivalTime).diff(this.props.departureTime)).format('hh[h]mm');

		return (
			<div className="row fade-in">
				<div className="result large-8 large-offset-2 medium-10 medium-offset-1 small-10 small-offset-1 columns">
					<div className="row">
						<div className="operator-block large-3 medium-3 small-12 columns">
							<img src={operator_logo} className="operator-logo" />
							<div className="operator-icons">
								{this.props.amenities.wifi && <span data-balloon={translations.wifi} data-balloon-pos="up"><i className="fa fa-wifi" aria-hidden="true" ></i></span>}
								{this.props.amenities.tv && <span data-balloon={translations.tv} data-balloon-pos="up"><i className="fa fa-television" aria-hidden="true" ></i></span>}
								{this.props.amenities.power_outlets && <span data-balloon={translations.power_outlets} data-balloon-pos="up"><i className="fa fa-plug" aria-hidden="true" ></i></span>}
								{this.props.amenities.ac && <span data-balloon={translations.ac} data-balloon-pos="up"><i className="fa fa-asterisk" aria-hidden="true" ></i></span>}
							</div>
							<p className="class">{this.props.travelClass}</p>
						</div>
						<div className="details-block large-6 medium-6 small-12 columns">
							<div className={'detail-departure time-' + this.props.lang}>
								<span className="detail-address"><span className="detail-time">{moment(this.props.departureTime).format(this.props.lang == 'fr' ? 'HH:mm' : 'hh:mm A')}</span>{this.props.departure.name}</span>
								<span  className="detail-city">{this.props.departure.city.full_name}</span>
							</div>
							<div className={'detail-arrival time-' + this.props.lang}>
								<span className="detail-address"><span className="detail-time">{moment(this.props.arrivalTime).format(this.props.lang == 'fr' ? 'HH:mm' : 'hh:mm A')}</span>{this.props.arrival.name}</span>
								<span  className="detail-city">{this.props.arrival.city.full_name}</span>
							</div>
						</div>
						<div className="price-block large-3 medium-3 small-12 columns">
							<p className="price" data-currency={this.props.currency}>${this.props.price/100}</p>
							<p className="desc" dangerouslySetInnerHTML={{__html: translations.per_person}}></p>
							<p className="desc"><span dangerouslySetInnerHTML={{__html: translations.duration}}></span> {time_diff}</p>
							<a className="btn hide-for-large" href={this.props.link} target="_blank"><i className="fa fa-shopping-cart" aria-hidden="true"></i></a>
							<a className="btn show-for-large" href={this.props.link} target="_blank" dangerouslySetInnerHTML={{__html: translations.buy}}></a>
						</div>
					</div>
				</div>
			</div>
		);
	}
});

export default Result;
