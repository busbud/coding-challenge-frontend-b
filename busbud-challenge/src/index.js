import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './index.css';
import Landing from './components/Landing';
import Results from './components/Results';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
<Router>
	<div>
		<Route path="/" exact component={Landing} />
		<Route path="/search" component={Results} />
	</div>
</Router>
, document.getElementById('root'));
serviceWorker.unregister();
