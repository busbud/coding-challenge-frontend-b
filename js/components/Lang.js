import React from 'react';
import LangSelector from './LangSelector';

var Lang = React.createClass({
    render() {
        return (
            <div>
                <LangSelector language='FR' currentPath={this.props.location.pathname}/>
                {this.props.children}
            </div>
        )
    }
});

export default Lang;