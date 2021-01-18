import React from 'react'
import styled from 'styled-components'
import { MdAutorenew } from 'react-icons/md'

// Component
import Button from '.'

const Div = styled.div`
  button {
    margin-right: 10px;
  }
`

export default {
  title: 'Components/Button',
  component: Button
}

export function Default() {
  return (
    <Div>
      <Button onClick={() => console.log('clicked')}>Click Me</Button>
      <Button primary onClick={() => console.log('clicked')}>
        Click Me
      </Button>
      <Button secondary onClick={() => console.log('clicked')}>
        Click Me
      </Button>
      <Button skyBlue onClick={() => console.log('clicked')}>
        Click Me
      </Button>
    </Div>
  )
}

export function Rounded() {
  return (
    <Div>
      <Button onClick={() => console.log('clicked')} rounded>
        Click Me
      </Button>
      <Button rounded primary onClick={() => console.log('clicked')}>
        Click Me
      </Button>
      <Button rounded secondary onClick={() => console.log('clicked')}>
        Click Me
      </Button>
      <Button rounded skyBlue onClick={() => console.log('clicked')}>
        Click Me
      </Button>
    </Div>
  )
}

export function Circle() {
  return (
    <Div>
      <Button circle onClick={() => console.log('clicked')}>
        <MdAutorenew />
      </Button>
      <Button circle primary onClick={() => console.log('clicked')}>
        <MdAutorenew />
      </Button>
      <Button circle secondary onClick={() => console.log('clicked')}>
        <MdAutorenew />
      </Button>
      <Button circle skyBlue onClick={() => console.log('clicked')}>
        <MdAutorenew />
      </Button>
    </Div>
  )
}
