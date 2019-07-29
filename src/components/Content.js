import React, { useContext } from 'react'
import { AppContext } from '../contexts'
import SelectionMenu from './SelectionMenu'
import ResultsMenu from './ResultsMenu'

const Content = () => {
  const { busOptions } = useContext(AppContext)
  return busOptions ? <ResultsMenu /> : <SelectionMenu />
}

export default Content
