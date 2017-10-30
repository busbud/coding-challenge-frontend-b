import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

class SubmitButton extends Component {
  render() {
    return (
      <Button color="orange" type="submit" fluid>
        {this.props.label}
      </Button>
    );
  }
}

export default SubmitButton;
