"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
var mobx_react_1 = require("mobx-react");
var app_1 = require("./app/app");
var search_1 = require("./app/store/search");
ReactDOM.hydrate(React.createElement(mobx_react_1.Provider, { store: search_1.default },
    React.createElement(app_1.default, null)), document.getElementById('app'));
//# sourceMappingURL=browser.js.map