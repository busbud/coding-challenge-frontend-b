var React = require('react');
var Header = require('./Header');

class App extends React.Component {
	render() {
		return (
			<div className='container'>
				<Header />
			</div>
		);
	}
}

module.exports = App;