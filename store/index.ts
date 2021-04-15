import { createContext, Dispatch, useContext } from 'react'
import { ICity, ILocation, IXDeparture } from '../types'

export type StateEntry<T> = { [id:string]: T }
export type ActionTypes = 'ADD_CITY' | 'ADD_LOCATION' | 'ADD_DEPARTURE' | 'COMPLETE_POLL'

export interface IAction {
  type: ActionTypes,
  payload?: ICity | ILocation | IXDeparture
}

export interface IAppState {
  cities: StateEntry<ICity>,
  locations: StateEntry<ILocation>,
  departures: StateEntry<IXDeparture>,
  pollCompleted: boolean
}

export type AppContextType = [IAppState, Dispatch<IAction>]

export const initialState: IAppState = {
  cities: {},
  locations: {},
  departures: {},
  pollCompleted: false
}

export function appReducer(state: IAppState, action: IAction): IAppState {
  switch (action.type) {
    case 'ADD_CITY':
      return {
        ...state,
        cities: {
          ...state.cities,
          [action.payload.id]: action.payload as ICity
        }
      }
    case 'ADD_LOCATION':
      return {
        ...state,
        locations: {
          ...state.locations,
          [action.payload.id]: action.payload as ILocation
        }
      }
    case 'ADD_DEPARTURE':
      return {
        ...state,
        departures: {
          ...state.departures,
          [action.payload.id]: action.payload as IXDeparture
        }
      }
    case 'COMPLETE_POLL':
      return {
        ...state,
        pollCompleted: true
      }
    default:
      return state;
  }
}

export function addCity(payload: ICity): IAction {
  return {
    type: 'ADD_CITY',
    payload
  }
}

export function addLocation(payload: ILocation): IAction {
  return {
    type: 'ADD_LOCATION',
    payload
  }
}

export function addDeparture(payload: IXDeparture): IAction {
  return {
    type: 'ADD_DEPARTURE',
    payload
  }
}

export function completePoll(): IAction {
  return {
    type: 'COMPLETE_POLL'
  }
}

export const AppContext = createContext<AppContextType>([initialState, () => {}])

export function useAppContext():AppContextType {
  return useContext(AppContext)
}
