import React from 'react';
import store from './reducer';

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
                <h1>Busbud front-end coding challenge</h1>
                {this.getChildrenWithProps()}
            </div>
        )
    }
});

export default App;