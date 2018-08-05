import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import AppTopbar from './components/AppTopbar'
import AppFooter from './components/AppFooter'
import Welcome from './views/Welcome'
import SearchForm from './views/SearchForm'
import SearchResults from './views/SearchResults'
import './index.scss'

export default class App extends React.Component {
  render () {
    return (
      <Router>
        <div className="app-wrap">
          <AppTopbar />
          <div className="app-grid">
            <Route path={'/'} component={Welcome} exact={true} />
            <Route path={'/search-form'} component={SearchForm} />
            <Route
              path={'/search-results/:origin/:destination/:date'}
              component={SearchResults}
            />
          </div>
          <AppFooter />
        </div>
      </Router>
    )
  }
}
