import { useReducer } from 'react'
import { AppContext, initialState, appReducer } from '../../store'

export default function AppWrapper({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {children}
    </AppContext.Provider>
  )
}
