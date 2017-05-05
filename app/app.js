import React from 'react'
import { Provider } from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import { Home, BusScheduleResults } from './components'

const App = ({store}) => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/" component={Home}/>
        <Route path="/bus-schedule-results/:departure/:destination" component={BusScheduleResults} />
      </Switch>
    </Router>
  </Provider>
)
// en-ca/bus-schedules-results/f25dvk/dr5reg?outbound_date=2017-05-05&return_date=2017-05-09&adults=1

export default App
