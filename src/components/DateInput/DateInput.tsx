import React from 'react'
import { useRouter } from 'next/router'
import { IntlText } from '../Intl/IntlText'
import { FormField, DateInput as Input, DateInputProps } from 'grommet'
import { DateDomain, LanguageDomain } from '../../domain/language'

type Props = {
  value: string
  onChange: DateInputProps['onChange']
}
const DateInput = (props: Props) => {
  const { locale } = useRouter()
  const format = DateDomain.localeDateMask(locale as LanguageDomain.Language)

  const dateField = {
    readOnly: true,
    calendarProps: {
      locale: locale,
      size: 'small',
      bounds: [DateDomain.todayString(), '2025-01-01'],
    },
    name: 'date',
    defaultValue: DateDomain.todayString(),
  }

  return (
    <FormField width="150px" label={<IntlText id="date" />}>
      <Input format={format} {...dateField} onChange={props.onChange} />
    </FormField>
  )
}

export default DateInput
