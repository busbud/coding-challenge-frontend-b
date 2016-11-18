import React from 'react';

class AppComponent extends React.Component {
  render() {
    return (
      <div className="greeting">
        Hello {this.props.name}!
      </div>
    );
  }
}

export default AppComponent;
