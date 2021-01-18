// Packages
import React from 'react'

// Containers
import Header from 'containers/header'
import Footer from 'containers/footer'
import FilteredTickets from 'containers/filtered-tickets'

const Home = () => (
  <>
    <Header />
    <FilteredTickets />
    <Footer />
  </>
)

export default Home
