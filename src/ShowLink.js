var React = require('react');

var BusSchedule = React.createClass({
	render: function(){
		if(this.props.show === true){
			return (
				<a href = "https://www.busbud.com/" target = "_blank"> Head over to BusBud to book tickets!</a>
			);
		}else{
			return(<a></a>)
		}
		
	}
});

module.exports = BusSchedule;