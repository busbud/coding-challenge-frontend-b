import React, { PropTypes } from 'react';
import './Loader.scss';

class Loader extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {

        return (
            <div className="loader">
                <div className="loader__animation"></div>
            </div>
        );
    }
}

export default Loader;