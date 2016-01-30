import React from 'react';
import LangSelector from './LangSelector';

var Lang = React.createClass({
    getChildrenWithStore(){
        var comp = this;
        return React.Children.map(this.props.children, function(child) {
            return React.cloneElement(child, { store: comp.props.store });
        });
    },
    render() {
        const store = this.props.store;
        var childrenWithProps = React.Children.map(this.props.children, function(child) {
            return React.cloneElement(child, {store:store});
        });

        return (
            <div>
                <LangSelector language='FR' currentPath={this.props.location.pathname}/>
                <LangSelector language='ENG' currentPath={this.props.location.pathname}/>
                {this.getChildrenWithStore()}
            </div>
        )
    }
});

export default Lang;