import React, { PropTypes } from 'react';
import './Loader.scss';

class Loader extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
console.log('this.props',this.props);
    let { big } = this.props; //@TODO: handle big loader

    return (
      <div className="loader">
        
      </div>
    );
  }
}

Loader.propTypes = {
    big: PropTypes.bool
};

export default Loader;