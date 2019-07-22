import React from 'react';

export default class ErrorMessage extends React.Component {
  render() {
    const { text } = this.props;
    return <div className="error-page-container">{text}</div>;
  }
}
