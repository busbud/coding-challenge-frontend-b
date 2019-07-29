import React, { useState } from 'react'
import './App.css'
import { AppContext } from './contexts'
import { Container, Header, Content, ContentBtn } from './components'
import { getUserLanguage } from './util'

const App = () => {
  const userLanguage = getUserLanguage()
  const [language, setLanguage] = useState(userLanguage)
  const [outboundDate, setOutboundDate] = useState('')
  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const [busOptions, setBusOptions] = useState(null)
  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        outboundDate,
        setOutboundDate,
        busOptions,
        setBusOptions,
        origin,
        setOrigin,
        destination,
        setDestination,
      }}>
      <Container>
        <Header />
        <Content />
        <ContentBtn />
      </Container>
    </AppContext.Provider>
  )
}

export default App
