import React, { MouseEventHandler } from 'react'
import { Transaction } from 'grommet-icons'
import { Button } from 'grommet'

type LocationSwitchProps = {
  onClick: MouseEventHandler
}

const LocationSwitch = ({ onClick }: LocationSwitchProps) => (
  <Button onClick={onClick}>
    <Transaction />
  </Button>
)

export default LocationSwitch
