import React, { PropTypes } from 'react';
import './Loader.scss';

class Loader extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {

    let { big } = this.props;

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