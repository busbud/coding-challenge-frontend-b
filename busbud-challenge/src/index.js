import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { LocalizeProvider } from 'react-localize-redux';
import './index.css';
import Landing from './components/Landing';
import Results from './components/Results';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
	<LocalizeProvider>
		<Router>
			<div>
				<Route path="/" exact component={Landing} />
				<Route path="/search" component={Results} />
			</div>
		</Router>
	</LocalizeProvider>
, document.getElementById('root'));
serviceWorker.unregister();
