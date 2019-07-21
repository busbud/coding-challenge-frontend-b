import React from "react";

export default class Placeholder extends React.Component {
  render() {
    const { content } = this.props;
    return <div className="placeholder-container">{content}</div>;
  }
}
