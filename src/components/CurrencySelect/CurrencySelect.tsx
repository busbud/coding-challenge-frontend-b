import React from 'react'
import { Menu } from 'grommet'
import styled from 'styled-components'

import { CurrencyDomain } from '../../domain/currency'
import { useCurrency } from '../../store/currency/hooks'

const ActiveMenu = styled.div`
  color: ${(props) => props.theme.colors.blue};
  font-weight: 700;
`
const CurrencySelect = () => {
  const { currency, setCurrency } = useCurrency()

  const items = CurrencyDomain.currencies.map((curr) => {
    let label
    if (curr === currency.value) {
      label = <ActiveMenu>{curr}</ActiveMenu>
    } else {
      label = curr
    }

    return {
      label,
      onClick: () => setCurrency(curr),
    }
  })
  return <Menu label={currency.value} items={items} />
}

export default CurrencySelect
