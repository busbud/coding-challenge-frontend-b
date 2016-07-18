var classNames = require('classnames');

var Filters = React.createClass({

	// Get filters translations
	getTranslations: function() {
		var translations = {
			en: {
				sort: 'Sort:',
				time: 'Time',
				price: 'Price',
				currency: 'Currency:'
			},
			fr: {
				sort: 'Trier :',
				time: 'Temps',
				price: 'Prix',
				currency: 'Devise :'
			}
		};
		return translations[this.props.lang];
	},

	// Change currency (USD/CAD)
	changeCurrency: function(e) {
		this.props.setSearchState({currency: e.target.getAttribute('data-currency')});
	},

	// Change results sorting (Price/Time)
	changeSort: function(e) {
		this.props.setSearchState({sort: e.target.getAttribute('data-sort')}, false);
	},

	// Render filters block
	render: function(){
		var translations = this.getTranslations();
		return (
			<div className="row fade-in" id="filters">
				<div className="large-8 medium-10 small-10 large-offset-2 medium-offset-1 small-offset-1 columns">
					<div className="row">
						<div className="filter large-6 medium-6 small-12 columns">
							<span dangerouslySetInnerHTML={{__html: translations.sort}}></span>
							<a className={classNames({active: this.props.sort == 'time'})} href="#" onClick={this.changeSort} data-sort="time" dangerouslySetInnerHTML={{__html: translations.time}}></a>
							<a className={classNames({active: this.props.sort != 'time'})} href="#" onClick={this.changeSort} data-sort="price" dangerouslySetInnerHTML={{__html: translations.price}}></a>
						</div>
						<div className="filter large-6 medium-6 small-12 columns">
							<span dangerouslySetInnerHTML={{__html: translations.currency}}></span>
							<a className={classNames({active: this.props.currency == 'USD'})} onClick={this.changeCurrency} data-currency="USD">USD</a>
							<a className={classNames({active: this.props.currency != 'USD'})} onClick={this.changeCurrency} data-currency="CAD">CAD</a>
						</div>
					</div>
				</div>
			</div>
		);
	}
});

export default Filters;
