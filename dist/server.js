"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var server_1 = require("react-dom/server");
var Express = require("express");
var mobx_react_1 = require("mobx-react");
var styled_components_1 = require("styled-components");
var search_1 = require("./app/store/search");
var html_1 = require("./html");
var app_1 = require("./app/app");
var app = Express();
app.use(Express.static('dist'));
var initialData = {
    name: 'World'
};
app.get('/', function (req, res) {
    var sheet = new styled_components_1.ServerStyleSheet();
    var jsx = sheet.collectStyles(React.createElement(html_1.default, { initialData: JSON.stringify(initialData) },
        React.createElement(mobx_react_1.Provider, { store: search_1.default },
            React.createElement(app_1.default, null))));
    var stream = sheet.interleaveWithNodeStream(server_1.renderToNodeStream(jsx));
    stream.pipe(res);
});
app.listen(8888, function () {
    console.log('listening on port 8888...');
});
//# sourceMappingURL=server.js.map