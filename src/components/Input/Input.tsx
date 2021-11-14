import React, { InputHTMLAttributes } from "react";
import "./input.scss";

function Input({
  value,
  onChange,
  placeholder,
  type,
  name,
}: Omit<InputHTMLAttributes<HTMLInputElement>, "className">): JSX.Element {
  return (
    <input
      name={name}
      className="Input"
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}

export default Input;
