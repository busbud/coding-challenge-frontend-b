import { appReducer, initialState, IAction, IAppState } from './index'
import { ICity } from '../types'

describe('appReducer function', () => {
  it('should able to add cities', () => {
    const cityOne: ICity = {
      id: '10',
      name: 'Istanbul'
    }

    const cityTwo: ICity = {
      id: '20',
      name: 'Berlin'
    }

    const actionOne: IAction = {
      type: 'ADD_CITY',
      payload: cityOne
    }

    const actionTwo: IAction = {
      type: 'ADD_CITY',
      payload: cityTwo
    }

    let state = appReducer(initialState, actionOne)
    expect(state).toMatchObject<IAppState>({ ...state, cities: { '10': cityOne }})

    state = appReducer(state, actionTwo)
    expect(state).toMatchObject<IAppState>({...state, cities: { '20': cityTwo }})
  })

  // it should add locations
  // it should add depatures
  // it shoudl set polling as complete
})