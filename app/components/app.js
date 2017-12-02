import React, { Component } from 'react'
import { connect }          from 'react-redux'
import DeparturesList       from './departures_list'
import Footer               from './footer'
import Header               from './header'
import { getDepartures }    from '../store/actions.js'

export class App extends Component {
  componentWillMount() {
    this.props.componentWillMount()
  }

  render() {
    return (
      <div>
        <Header />
        <main id="main">
          <DeparturesList />
        </main>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = _ => ({})

const mapDispatchToProps = (dispatch) => ({
  componentWillMount : _ => {
    dispatch(getDepartures('dr5reg', 'f25dvk', '2018-08-02'))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(App)