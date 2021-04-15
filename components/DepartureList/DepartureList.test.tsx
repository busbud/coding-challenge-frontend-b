import { useReducer } from 'react'
import DepatureList from './DepaturesList'
import { appReducer, AppContext, initialState, IAppState } from '../../store'
import { ICity, ILocation, IXDeparture, IPrice } from '../../types'
import { render, screen } from '@testing-library/react'

const departureFields: IXDeparture = {
  arrival_time: new Date(),
  departure_time: new Date(),
  origin_location_id: '10',
  destination_location_id: '10',
  prices: {
    total: 1000,
    currency: 'USD'
  } as IPrice
} as IXDeparture

const exampleCity: ICity = {
  id: '10',
  name: 'Istanbul'
}

const exampleLocation: ILocation = {
  id: '10',
  name: 'A bus stop to watch sky',
  city_id: '10'
}

const exampleLocation2: ILocation = {
  id: '20',
  name: 'stop that we wont visit',
  city_id: '10'
}

function Example() {
  const updatedState:IAppState = {
    ...initialState,
    departures: { '10': departureFields as IXDeparture },
    locations: { '10': exampleLocation },
    cities: { 10: exampleCity }
  }

  const [state, dispatch] = useReducer(appReducer, updatedState)

  return (
    <AppContext.Provider value={[state, dispatch]}>
      <DepatureList pollCompleted={false} />
    </AppContext.Provider>
  )
}

describe('DepatureList Component', () => {
  it('should render departures loaded depatures first than render later after request', async () => {

    const departures = [{ id: '20', ...departureFields }, { id: '30', ...departureFields  }]
    const mockedResponse = { locations: [], departures, complete: false }

    fetchMock.mockResponseOnce(JSON.stringify(mockedResponse))

    const departures2 = [{ id: '40', ...departureFields  }, { id: '50', ...departureFields  }]
    const mockedResponse2 = { locations: [], departures: departures2, complete: true }

    fetchMock.mockResponseOnce(JSON.stringify(mockedResponse2))

    const departures3 = [{ id: '60', ...departureFields, origin_location_id: '20'  }, { id: '70', ...departureFields  }]
    const mockedResponse3 = { locations: [exampleLocation2], departures: departures3, complete: false }

    fetchMock.mockResponseOnce(JSON.stringify(mockedResponse3))
    const { findAllByText } = render(<Example />)

    await findAllByText(/A bus stop to watch sky/)
    expect(screen.queryByText(/stop that we wont visit/)).not.toBeInTheDocument()
  })
})
