import React from 'react';
import {Link} from 'react-router';

var LangSelector = React.createClass({
    getLangNewPath(){
        const lang = this.props.language;
        const subpath = this.props.currentPath.split('/').slice(2).join('/');
        return '/'+lang+'/'+subpath;
    },
    render() {
        return (
            <Link to={this.getLangNewPath()}>{this.props.language}</Link>
        )
    }
});

export default LangSelector;