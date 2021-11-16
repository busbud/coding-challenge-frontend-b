import React, { ComponentPropsWithoutRef } from "react";
import "./button.scss";

function Button({
  children,
  disabled,
  onClick,
  type = "button",
}: ComponentPropsWithoutRef<"button">): JSX.Element {
  return (
    <button
      type={type === "submit" ? "submit" : "button"}
      disabled={disabled}
      className="Button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
