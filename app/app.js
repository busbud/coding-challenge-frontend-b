import React from 'react'
import { Provider } from 'react-redux'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import { SearchContainer } from './containers'
import { Home, BusScheduleResults, Header, Footer, ErrorPage } from './components'

const style = {
  minHeight: '100vh',
  display: 'flex',
  flexFlow: 'row wrap'
}

const App = ({store}) => (
  <Provider store={store}>
    <Router>
      <div style={style}>
        <Header/>
        <SearchContainer />
        <Route path="/" exact component={Home}/>
        <Route path="/bus-schedule-results/:departure/:destination/:date" component={BusScheduleResults} />
        <Route path="/error/:type" component={ErrorPage}/>
        <Footer/>
      </div>
    </Router>
  </Provider>
)

export default App
