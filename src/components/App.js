import React from 'react'
import * as utils from './../utils'
import Departure from './Departure'
import Form from './Form'
import styled from 'styled-components'

const Main = styled.main`
  margin: 10px 0;

    @media only screen and (min-width: 767px) {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        flex-wrap: wrap;
    }
`

class App extends React.PureComponent {

  constructor() {
    super()
    this.state = {
      journey: [],
      journeyIsLoaded: false,
      formData: {
        adult: '1',
        lang: 'EN',
        currency: 'USD',
      },
      currencyFormatter: null,
    }
  }

  componentDidMount = () => {
    this.getJourney()
    const currencyFormatter = utils.createFormatter(this.state.formData.lang, this.state.formData.currency)
    this.setState({ currencyFormatter })
  }

  handleForm = (e) => {
    const updatedField = { [e.target.id]: e.target.value }
    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        ...updatedField,
      }
    }))    
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { lang, currency } = this.state.formData
    const currencyFormatter = utils.createFormatter(lang, currency)
    this.setState({ currencyFormatter })
    this.getJourney()
  }

  getJourney = async () => {
    const { adult, lang, currency } = this.state.formData

    let journey, intervalId

    journey = await utils.journeyService({ adult, lang, currency })
    
    if (journey.complete === false) {
      this.setState({ journeyIsLoaded: false })

      const pollData = async () => {
        journey = await utils.journeyService({ adult, lang, currency, shouldPoll: true })

        if (journey.complete === true) {
          this.setState({ journey, journeyIsLoaded: true })
          clearInterval(intervalId)
        }
        
      }

      intervalId = setInterval(pollData, 2000);

    } else {
      this.setState({ journey, journeyIsLoaded: true })
    }
  }

  render() {
    const { journey, journeyIsLoaded, formData } = this.state

    return(
      <>
        <Form handleForm={this.handleForm} handleSubmit={this.handleSubmit} formData={formData} />
        <Main>
          {
            journeyIsLoaded ? journey.departures.map(departure => (
              <Departure
                key={departure.id}
                departureTime={utils.getFormattedTime(departure.departure_time)} 
                arrivalTime={utils.getFormattedTime(departure.arrival_time)}
                tripDuration={utils.getTripDuration(departure.arrival_time, departure.departure_time)}
                departureLocation={utils.getLocationFromId(departure.origin_location_id, journey.locations)}
                arrivalLocation={utils.getLocationFromId(departure.destination_location_id, journey.locations)}
                price={this.state.currencyFormatter.format(departure.prices.total / 100)}
              />
            )) : <p>Loading...</p>
          }
        </Main>
      </>
    )
  }
}

export default App