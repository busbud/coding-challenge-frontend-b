var React = require('react');

var ShowLink = React.createClass({
	render: function(){
		if(this.props.show === true){
			if(this.props.displayInFrench === false){
				return (
					<a href = "https://www.busbud.com/" target = "_blank"> Head over to BusBud to book tickets!</a>
				);
			}else{
				return(
					<a href = "https://www.busbud.com/" target = "_blank"> 
					Aller à busbud pour réserver des billets!</a>
				);
			}
		}else{
			return(null);
		}
		
	}
});

module.exports = ShowLink;