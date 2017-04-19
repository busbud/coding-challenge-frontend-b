import React from 'react';
import {store} from './reducer';

import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

var App = React.createClass({
    getChildrenWithProps(){
        var comp = this;
        return React.Children.map(this.props.children, function(child) {
            return React.cloneElement(child, { store: store });
        });
    },
    render() {
        return (
            <div>
                {this.getChildrenWithProps()}
            </div>
        )
    }
});

export default App;