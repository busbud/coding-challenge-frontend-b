import React from 'react';
import ReactDom from 'react-dom';

const Loader = React.createClass({
  render: function() {
    return (<div className="mdl-spinner mdl-js-spinner is-active"></div>);
  },

  componentDidMount: function() {
    let domNode = ReactDom.findDOMNode(this);
    componentHandler.upgradeElement(domNode);
  }
});

export default Loader;