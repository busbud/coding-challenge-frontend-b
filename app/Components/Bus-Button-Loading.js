var React = require('react');

module.exports = React.createClass({
	displayName: 'BusButtonLoading',
	
	getInitialState: function () {
		return {
			showButton: true,
      showLoading: false
		}	
	},
	onButtonClick: function(){
    this.setState({ showButton: false });
    this.setState({ showLoading: true });
    this.props.initiateSearch;
  },

	render: function() {
		<div className="on-boarding-section">
      { this.state.showButton ? <input className="the-button btn-default" ref='refreshButton' type='button' onClick={ this.onButtonClick } value='Click here to find a bus!'></input> : null}
      { this.state.showLoading ? <span className="glyphicon glyphicon-refresh spinning"></span> : null }
     </div>
	}

});