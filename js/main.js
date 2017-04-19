import React  from 'react';
import ReactDOM  from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import { createHistory } from 'history';

import App from './components/App';
import NotFound from './components/NotFound';
import Landing from './components/Landing';
import Home from './components/Home';
import Departures from './components/Departures';

var routes = (
    <Router history={createHistory()}>
        <Route path="/" component={App}>
            <IndexRoute component={Landing}/>
            <Route path=":lang" component={Home}>
                <Route path="departures(/:origin/:dest/:date)" component={Departures}/>
            </Route>
            <Route path="*" component={NotFound}/>
        </Route>
    </Router>
)

ReactDOM.render(routes, document.querySelector('#app'));
