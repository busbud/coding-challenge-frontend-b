import React from 'react'
import { Provider } from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import { SearchContainer } from './containers'
import { Home, BusScheduleResults, Header, Footer } from './components'

const App = ({store}) => (
  <Provider store={store}>
    <Router>
      <div>
        <Header/>
        <SearchContainer />
        <Route path="/" exact component={Home}/>
        <Route path="/bus-schedule-results/:departure/:destination/:date" component={BusScheduleResults} />
        <Footer/>
      </div>
    </Router>
  </Provider>
)

export default App
