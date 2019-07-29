import React, { useContext } from 'react'
import Styled from 'styled-components'
import Loader from 'react-loader-spinner'
import ResultsMenuItem from './ResultsMenuItem'
import ResultsMenuItemNoResults from './ResultsMenuItemNoResults'
import { AppContext } from '../contexts'

const Container = Styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
`

const ResultsMenu = () => {
  const { busOptions } = useContext(AppContext)
  const { isLoading } = busOptions
  const content = isLoading ? (
    <Loader type="Bars" color="hotpink" height="300" width="300" />
  ) : busOptions.options ? (
    busOptions.options.map((option, index) => (
      <ResultsMenuItem key={index} option={option} />
    ))
  ) : (
    <ResultsMenuItemNoResults />
  )

  return <Container>{content}</Container>
}

export default ResultsMenu
