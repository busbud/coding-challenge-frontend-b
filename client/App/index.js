import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import AppTopbar from './components/AppTopbar'
import AppFooter from './components/AppFooter'
import Welcome from './views/Welcome'
import SearchForm from './views/SearchForm'
import './index.scss'

export default class App extends React.Component {
  render () {
    return (
      <Router>
        <div className="app-wrap">
          <AppTopbar />
          <div className="app-grid">
            <Route path={'/'} component={Welcome} exact={true} />
            <Route path={'/search'} component={SearchForm} />
          </div>
          <AppFooter />
        </div>
      </Router>
    )
  }
}
