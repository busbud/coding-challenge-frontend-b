// Packages
import React from 'react'

// Containers
import Header from 'containers/header'
import Footer from 'containers/footer'
import FilteredTickets from 'containers/filtered-tickets'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

const Home = () => (
  <>
    <Header />
    <FilteredTickets />
    <Footer />
    <ToastContainer containerId="busbud-toastify" draggable={false} />
  </>
)

export default Home
