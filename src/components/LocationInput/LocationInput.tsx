import React, { useState } from 'react'

import { FormField, FormFieldProps, TextInput, TextInputProps } from 'grommet'

type Props = {
  formField: FormFieldProps
  textInput: TextInputProps
}

const LocationInput = (props: Props) => {
  const [value, setValue] = useState('')

  const onSelect: TextInputProps['onSelect'] = (event) =>
    setValue(event.suggestion)

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value: newValue } = event.target
    setValue(newValue)

    if (!newValue.trim()) {
      // setSuggestedFolks([])
    } else {
      // // simulate an async call to the backend
      // setTimeout(() => setSuggestedFolks(folks), 300)
    }
  }

  return (
    <FormField {...props.formField}>
      <TextInput
        value={value}
        onChange={onChange}
        onSelect={onSelect}
        {...props.textInput}
      />
    </FormField>
  )
}

export default LocationInput
