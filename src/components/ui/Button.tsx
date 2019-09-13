import React from "react";
import "./Button.css";

interface ButtonProps {
  type: "primary" | "secondary";
  size: "medium" | "big";
  className?: string;
  onClick?: () => void;
}

const Button: React.FunctionComponent<ButtonProps> = props => {
  return (
    <div
      onClick={props.onClick}
      className={`${props.className} button button--${props.type} button--${props.size}`}
    >
      {props.children}
    </div>
  );
};

export default Button;
