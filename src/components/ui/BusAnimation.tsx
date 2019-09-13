import React from "react";
import "./BusAnimation.css";
import busIcon from "./bus.svg";

export default () => {
  return (
    <div className="bus-animation">
      <img className="bus-image" src={busIcon} alt="CoolBus.jpg" />
      <div className="bus-road">
        <div className="bus-road-stripe"></div>
        <div className="bus-road-stripe bus-road-stripe--2"></div>
      </div>
    </div>
  );
};
