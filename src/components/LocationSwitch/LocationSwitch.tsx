import React, { MouseEventHandler } from 'react'
import { Transaction } from 'grommet-icons'
import { Button } from 'grommet'
import styled from 'styled-components'

type LocationSwitchProps = {
  onClick: MouseEventHandler
}

const StyledButton = styled(Button)`
  margin: 0 5px;
  width: 34px;
  height: 34px;
  transform: rotate(45deg);
  border-radius: 4px;
  text-align: center;
  display: flex;
  align-items: center;
  align-self: center;
  justify-content: center;
  transition: all 200ms;
  border: 2px solid transparent;
  &:hover {
    border-color: ${(props) => props.theme.colors.blue};
  }
  svg {
    transform: rotate(-45deg);
  }
`
const LocationSwitch = ({ onClick }: LocationSwitchProps) => (
  <StyledButton data-testid="PLACE_SWITCH" onClick={onClick}>
    <Transaction />
  </StyledButton>
)

export default LocationSwitch
