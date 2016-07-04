
var LangToggler = require('../../src/components/LangToggler/LangToggler');
var React          = require('react');
var ReactDOM       = require('react/dom');
var ReactTestUtils = require('react-addons-test-utils');

var _ = require('lodash');
var defaultProps = {};

const Component = LangToggler;

function render(newProps, callback) {
    var props = _.merge(defaultProps, newProps);
    return ReactDOM.render(Component(props), document.body, function() {
        if (typeof callback === 'function') setTimeout(callback);
    });
}

describe('My Component', function() {

    afterEach(function(done) {
        React.unmountComponentAtNode(document.body) // Assuming mounted to document.body
        document.body.innerHTML = ""                // Just to be sure :-P
        setTimeout(done)
    });

    it('should test the lang toggler TODO', function(done) {
      var _tree = render({}, function() {
          var __input = document.querySelectorAll('input')
          var _input  = ReactTestUtils.findRenderedDOMComponentWithTag(_tree, 'input')

      })
  })
})