import React from "react";
import "./Button.css";

interface ButtonProps {
  type: "primary" | "secondary";
  className?: string;
}

const Button: React.FunctionComponent<ButtonProps> = props => {
  return (
    <div className={`${props.className} button button--${props.type}`}>
      {props.children}
    </div>
  );
};

export default Button;
