import { useSelector } from 'react-redux'

import { setCurrency } from '../currency'
import { getCurrency } from '../currency/selectors'
import { useAction } from '../useAction'

export const useCurrency = () => {
  const _getCurrency = useSelector(getCurrency)
  const _setCurrency = useAction(setCurrency)

  return {
    currency: _getCurrency,
    setCurrency: _setCurrency,
  }
}
