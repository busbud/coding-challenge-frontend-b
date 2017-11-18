import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from '../configureStore'
import AsyncApp from './AsyncApp'
import SearchForm from './SearchForm'
const store = configureStore()

export default class Root extends Component {
  render() {
    return (
      <Provider store={ store }>
        <div>
          <div className="App-intro">
            <SearchForm />
            <AsyncApp />
          </div>
        </div>
      </Provider>
    )
  }
}
