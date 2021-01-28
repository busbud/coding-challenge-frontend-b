import React from 'react'

import LocationForm from '../components/LocationForm/LocationForm'
import Layout from '../components/Layout/Layout'
import DeparturesListContainer from '../components/DeparturesList/DeparturesListContainer'

const Home = () => {
  return (
    <Layout>
      <LocationForm />
      <DeparturesListContainer />
    </Layout>
  )
}

export default Home
