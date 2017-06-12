var React = require('react');
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var {Route, Switch} = ReactRouter;
var Header = require('./Header');
var Search = require('./Search');
var Results = require('./Results');

class App extends React.Component {
	render() {
		return (
			<Router>
				<div className='container'>
					<Header />
					<Switch>
						<Route exact path='/' component={Search} />
						<Route path='/results' component={Results} />
						<Route render={function () {
							return (
								<h1
									style={{textAlign: 'center', color: '#FFF'}}>
									404! Not Found (Broken Link...)
								</h1>
							);
						}} />
					</Switch>
				</div>
			</Router>
		);
	}
}

module.exports = App;