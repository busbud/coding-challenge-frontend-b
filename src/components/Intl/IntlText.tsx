import React, { ReactElement } from 'react'
import { FormattedMessage, injectIntl, IntlShape } from 'react-intl'

type Values = {
  [key: string]: string | ReactElement | number
}

type Props = {
  intl: IntlShape
  id: string
  preFormat?: (message: string) => ReactElement
  values?: Values
}

const IntlComponent = ({ intl, id, preFormat, values }: Props): JSX.Element => {
  return preFormat ? (
    preFormat(intl.formatMessage({ id }))
  ) : (
    <FormattedMessage id={id} values={values} />
  )
}

export const IntlText = injectIntl(IntlComponent)
