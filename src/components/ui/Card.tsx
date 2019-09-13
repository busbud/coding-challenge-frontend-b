import * as React from "react";
import "./Card.css";

interface CardProps {
  children: any;
  className?: string;
}

const Card: React.FunctionComponent<CardProps> = props => {
  return <div className={`card ${props.className}`}>{props.children}</div>;
};

export default Card;
