// @flow
import React, { useState } from 'react';
import { StyledToggle } from './styledComponent';

type Props = {
    checked?: Boolean, //eslint-disable-line
    defaultChecked?: Boolean, //eslint-disable-line
    onChange?: Function,
    label?: String, //eslint-disable-line
    id: String,
    isDarkModeToggle?: Boolean,
}

function Toggle(props: Props) {
  const {
    checked,
    defaultChecked,
    onChange,
    label,
    id,
    isDarkModeToggle,
  } = props;

  const isControlled = checked !== undefined;

  const [check, setCheck] = useState(defaultChecked || false);

  const isChecked = isControlled ? checked : check;

  function handleChecked(e) {
    setCheck(!isChecked);
    onChange(e);
  }

  return (
    <StyledToggle
      htmlFor={id}
      isChecked={isChecked}
      isDarkModeToggle={isDarkModeToggle}
    >
      {label}
      <input
        type="checkbox"
        onChange={(e) => handleChecked(e)}
        checked={isChecked}
        id={id}
      />
    </StyledToggle>
  );
}

Toggle.defaultProps = {
  onChange: () => {},
  isDarkModeToggle: false,
};

export default Toggle;
