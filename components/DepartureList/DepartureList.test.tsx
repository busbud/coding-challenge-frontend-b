import { useReducer } from 'react'
import DepatureList from './DepaturesList'
import { appReducer, AppContext, initialState, IAppState } from '../../store'
import { IXDeparture } from '../../types'
import { render, screen } from '@testing-library/react'

function Example() {
  const updatedState:IAppState = {
    ...initialState,
    departures: { '10': {} as IXDeparture }
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
    const departures = [{ id: '20' }, { id: '30' }]
    const locations = [{id: '10'}]
    const mockedResponse = { locations, departures, complete: false }

    fetchMock.mockResponseOnce(JSON.stringify(mockedResponse))

    const departures2 = [{ id: '40' }, { id: '50' }]
    const locations2 = [{id: '15'}]
    const mockedResponse2 = { locations: locations2, departures: departures2, complete: true }

    fetchMock.mockResponseOnce(JSON.stringify(mockedResponse2))

    const departures3 = [{ id: '60' }, { id: '70' }]
    const locations3 = [{id: '20'}]
    const mockedResponse3 = { locations: locations3, departures: departures3, complete: false }

    fetchMock.mockResponseOnce(JSON.stringify(mockedResponse3))
    const { findByText } = render(<Example />)


    await findByText('10')
    expect(screen.queryByText('50')).toBeInTheDocument()
    expect(screen.queryByText('60')).not.toBeInTheDocument()
  })
})
