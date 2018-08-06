import React from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import AppTopbar from './components/AppTopbar'
import AppFooter from './components/AppFooter'
import Welcome from './views/Welcome'
import SearchForm from './views/SearchForm'
import SearchResults from './views/SearchResults'
import reducers from './reducers'
import './index.scss'

const store = createStore(reducers, applyMiddleware(thunk))

export default class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <Router>
          <div className="app-wrap">
            <AppTopbar />
            <div className="app-grid">
              <Route path={'/'} component={Welcome} exact={true} />
              <Route path={'/search-form'} component={SearchForm} />
              <Route path={'/search-results'} component={SearchResults} />
            </div>
            <AppFooter />
          </div>
        </Router>
      </Provider>
    )
  }
}
