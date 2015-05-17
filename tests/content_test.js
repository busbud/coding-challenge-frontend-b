var React = require('react');
var TestUtils = require('react/lib/ReactTestUtils'); 
var expect = require('expect');

var Content = require('../app/Components/Content.js');

describe('root', function () {
  it('downloads data from the server when the button is clicked', function() {
  	// render the Content object
    var content = TestUtils.renderIntoDocument(<Content/>);

	// mock the xmlhttprequest
    var xhr = sinon.useFakeXMLHttpRequest();
    var requests = [];
    xhr.onCreate = function (req) { requests.push(req); };

    // find the button
	var button = React.findDOMNode(content.refs.refreshButton);
	// click the bytton
	TestUtils.Simulate.click(button);

	// our fake response
	requests[0].respond(200, { "Content-Type": "application/json" },'{ "time" : "testing123" }');

	// check the server response
	var content = React.findDOMNode(content.refs.serverResponse);
	expect(content.textContent).toBe('testing123');

	// stop faking the xmlhttprequest
	xhr.restore();
  })
});
