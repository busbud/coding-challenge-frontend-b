import React, { useContext } from 'react'
import Styled from 'styled-components'
import { AppContext } from '../contexts'

const Button = Styled.button`
  background-color: ${props =>
    props.children === props.language ? 'hotpink' : 'white'};
  color: ${props => (props.children === props.language ? 'white' : 'hotpink')};

  :focus {outline:none !important}

  font-size: 1rem;
  margin: 1rem;
  padding: 0.25rem .5rem;
  border: 2px solid hotpink;
  border-radius: 3px;
`
const HeaderLanguageMenuBtn = ({ children }) => {
  const { language, setLanguage } = useContext(AppContext)

  function handleOnClick() {
    setLanguage(children)
  }

  return (
    <Button language={language} onClick={handleOnClick}>
      {children}
    </Button>
  )
}

export default HeaderLanguageMenuBtn
