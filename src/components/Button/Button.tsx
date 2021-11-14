import React from "react";
import "./button.scss";

export interface ButtonProps {
  disabled?: boolean;
  children: React.ReactNode;
}

function Button({ children, disabled }: ButtonProps): JSX.Element {
  return (
    <button type="button" disabled={disabled} className="Button">
      {children}
    </button>
  );
}

export default Button;
