import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';

class ReadOnlyInput extends Component {
  render() {
    return (
      <Form.Input label={this.props.label} value={this.props.value} readOnly />
    );
  }
}

export default ReadOnlyInput;
