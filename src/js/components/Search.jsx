var moment = require('moment');

var Search = React.createClass({

	// Get search translations
	getTranslations: function() {
		var translations = {
			en: {
				search: 'Search'
			},
			fr: {
				search: 'Recherche'
			}
		};
		return translations[this.props.lang];
	},

	// Render Search block
	render:function() {
		var translations = this.getTranslations();
		return (
			<div id="search">
				<div className="row">
					<div className="large-8 medium-10 small-10 large-offset-2 medium-offset-1 small-offset-1 columns">
						<div className="row search-bar">
							<div className="large-3 medium-3 small-12 columns"><i className="fa fa-home" aria-hidden="true"></i> New York</div>
							<div className="large-3 medium-3 small-12 columns"><i className="fa fa-map-marker" aria-hidden="true"></i> Montreal</div>
							<div className="large-3 medium-3 small-12 columns"><i className="fa fa-calendar-o" aria-hidden="true"></i> 29-07-2016</div>
							<div className="large-1 medium-2 small-12 columns"><i className="fa fa-user" aria-hidden="true"></i> 1</div>
							<a className="large-2 medium-1 small-12 columns" href="#" onClick={this.props.busbudCall}> <i className="fa fa-search fa-flip-horizontal hide-for-large" aria-hidden="true"></i> <span className="show-for-large" dangerouslySetInnerHTML={{__html: translations.search}}></span></a>
						</div>
					</div>
				</div>
			</div>
		);
	}
});

export default Search;
