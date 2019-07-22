import React from "react";

export default class Loading extends React.Component {
  render() {
    return (
      <div>
        <div className="lds-facebook">
          <div />
          <div />
          <div />
        </div>
      </div>
    );
  }
}
