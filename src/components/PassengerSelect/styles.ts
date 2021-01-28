import styled from 'styled-components'
import { Box, Button, Select } from 'grommet'

export const Passenger = styled(Box)`
  padding: 10px 5px;
  font-size: 18px;
  border-bottom: 1px solid ${(props) => props.theme.colors.blueLight};
`
export const PassengerText = styled.p`
  display: inline-block;
  font-weight: 700;
  margin: 0 5px;
`

export const PassengerAgeText = styled.p``

export const PassengerButtons = styled.div`
  margin-left: 20px;
`
export const PassengerButton = styled(Button)`
  display: inline-flex;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  background-color: ${(props) => props.theme.colors.blueLight};
  justify-content: center;
  align-items: center;
  margin: 5px;
  transition: background-color 200ms;

  &:hover {
    background-color: ${(props) => props.theme.colors.yellow};
  }

  svg {
    width: 14px;
    height: 14px;
  }
`
export const PassengerCounter = styled(Box)``

export const PassengerAge = styled(Box)`
  padding-left: 10px;
`

export const PassengerAgeSelect = styled(Select)`
  width: 60px;
`

export const PassengersCount = styled.div`
  margin-top: 8px;
`
