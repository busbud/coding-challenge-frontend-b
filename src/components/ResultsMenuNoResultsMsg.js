import React, { useContext } from 'react'
import Styled from 'styled-components'
import { AppContext } from '../contexts'

const ResultsMenuNoResultsMsg = Styled.p`
  color: hotpink;
  font-size: 2rem;
`

export default () => {
  const { language } = useContext(AppContext)
  const text =
    language === 'EN'
      ? 'It appears there is no results or there was a network error.  Please reset and try again.'
      : `Il semble qu'il n'y ait aucun résultat ou qu'il y ait une erreur de réseau. Veuillez réinitialiser et réessayer.`

  return <ResultsMenuNoResultsMsg>{text}</ResultsMenuNoResultsMsg>
}
