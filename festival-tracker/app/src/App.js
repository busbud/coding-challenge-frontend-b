import React from 'react'
import DepartureTracker from './containers/DepartureTrackerContainer/DepartureTrackerContainer'
import Layout from './hoc/Layout/Layout'

function App () {
  return (
    <Layout>
      <DepartureTracker />
    </Layout>
  )
}

export default App
