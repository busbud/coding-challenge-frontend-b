import React, { useState, useRef } from 'react'

import { FormField, FormFieldProps, TextInput, TextInputProps } from 'grommet'

type Props = {
  formField: FormFieldProps
  textInput: TextInputProps & {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  }
}

const LocationInput = (props: Props) => {
  return (
    <FormField {...props.formField}>
      <TextInput
        readOnly={true}
        value={props.textInput.value}
        {...props.textInput}
        onChange={props.textInput.onChange}
        onSelect={props.textInput.onSelect}
      />
    </FormField>
  )
}

export default LocationInput
