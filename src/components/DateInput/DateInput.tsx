import React from 'react'
import { useRouter } from 'next/router'
import { FormField, DateInput, FormFieldProps, DateInputProps } from 'grommet'
import { DateDomain, LanguageDomain } from '../../domain/language'

type Props = {
  formField?: FormFieldProps
  dateField?: DateInputProps
}
const Input = (props: Props) => {
  const { locale } = useRouter()
  const format = DateDomain.localeDateMask(locale as LanguageDomain.Language)

  return (
    <FormField {...props.formField}>
      <DateInput format={format} {...props.dateField} />
    </FormField>
  )
}

export default Input
