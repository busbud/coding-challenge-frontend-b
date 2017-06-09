var React = require('react');
var Header = require('./Header');
var Search = require('./Search');

class App extends React.Component {
	render() {
		return (
			<div className='container'>
				<Header />
				<Search />
			</div>
		);
	}
}

module.exports = App;