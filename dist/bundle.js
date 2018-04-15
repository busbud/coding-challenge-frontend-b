/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/browser.tsx","vendors~main"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app/app.tsx":
/*!*************************!*\
  !*** ./src/app/app.tsx ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var mobx_react_1 = __webpack_require__(/*! mobx-react */ "./node_modules/mobx-react/index.module.js");
var Loader_1 = __webpack_require__(/*! ./components/Loader/Loader */ "./src/app/components/Loader/Loader.tsx");
var styledComponents_1 = __webpack_require__(/*! ./components/styledComponents */ "./src/app/components/styledComponents.tsx");
var DepartureItem_1 = __webpack_require__(/*! ./components/DepartureItem/DepartureItem */ "./src/app/components/DepartureItem/DepartureItem.tsx");
var SearchForm_1 = __webpack_require__(/*! ./components/SearchForm/SearchForm */ "./src/app/components/SearchForm/SearchForm.tsx");
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    App.prototype.render = function () {
        var _a = this.props.store, search = _a.search, results = _a.results, isComplete = _a.isComplete, error = _a.error;
        return (React.createElement(styledComponents_1.Root, null,
            React.createElement(styledComponents_1.Header, null,
                React.createElement(styledComponents_1.HeaderH1, null, "Its Time to book for"),
                React.createElement(styledComponents_1.Image, { src: 'osheaga.png' })),
            React.createElement(styledComponents_1.Container, null,
                React.createElement(SearchForm_1.default, { onSubmit: function () { return search(); } })),
            React.createElement(styledComponents_1.Container, null, isComplete === false && (React.createElement(Loader_1.LoaderSvg, null))),
            error && React.createElement("h1", null, JSON.stringify(error)),
            results && (React.createElement(styledComponents_1.Container, null,
                React.createElement(styledComponents_1.Ul, null, results.departures.map(function (departure) { return (React.createElement(DepartureItem_1.default, { key: departure.id, departure: departure })); })))),
            React.createElement(styledComponents_1.Footer, null)));
    };
    App = __decorate([
        mobx_react_1.inject('store'),
        mobx_react_1.observer
    ], App);
    return App;
}(React.Component));
exports.default = App;


/***/ }),

/***/ "./src/app/components/BusSvg.tsx":
/*!***************************************!*\
  !*** ./src/app/components/BusSvg.tsx ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var styled_components_1 = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.es.js");
var BusSvg = function () { return (React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", version: "1.1", id: "Capa_1", x: "0px", y: "0px", width: "20px", height: "20px", viewBox: "0 0 552.506 552.506" },
    React.createElement("g", null,
        React.createElement("path", { d: "M103.918,334.136c-23.793,0-43.172,19.376-43.172,43.185s19.373,43.173,43.172,43.173   c23.817,0,43.172-19.364,43.172-43.173C147.09,353.524,127.742,334.136,103.918,334.136z M103.918,404.454   c-14.952,0-27.125-12.179-27.125-27.134c0-14.954,12.167-27.133,27.125-27.133c14.964,0,27.136,12.166,27.136,27.133   C131.054,392.275,118.888,404.454,103.918,404.454z M450.189,334.136c-23.809,0-43.178,19.376-43.178,43.185   s19.363,43.173,43.178,43.173s43.172-19.364,43.172-43.173C493.355,353.524,473.992,334.136,450.189,334.136z M450.189,404.454   c-14.961,0-27.139-12.179-27.139-27.134c0-14.954,12.166-27.133,27.139-27.133c14.949,0,27.127,12.166,27.127,27.133   C477.305,392.275,465.139,404.454,450.189,404.454z M536.461,320.776h16.033V177.858c0-25.325-20.521-45.846-45.84-45.846H45.842   C20.508,132.013,0,152.533,0,177.858v162.008c0,25.337,20.508,45.857,45.842,45.857h11.959c-0.292-2.137-0.487-4.293-0.487-6.503   c0-26.585,21.556-48.147,48.144-48.147c26.588,0,48.144,21.562,48.144,48.147c0,2.21-0.207,4.366-0.487,6.503h250.857   c-0.292-2.137-0.486-4.293-0.486-6.503c0-26.585,21.555-48.147,48.158-48.147c26.586,0,48.129,21.562,48.129,48.147   c0,2.21-0.194,4.366-0.486,6.503h53.219v-19.107h-16.039c-2.533,0-4.591-2.053-4.591-4.579v-36.682   C531.863,322.816,533.922,320.776,536.461,320.776z M305.664,155.706V265.74h-84.049V155.706H305.664z M89.401,265.74H72.586   c-38.584,0-37.811-22.914-37.811-25.441v-80.011c0-2.53,2.046-4.582,4.576-4.582h50.05h38.97V265.74H89.401z M132.957,265.74   V155.706h84.063V265.74H132.957z M402.725,265.74h-92.482V155.706h92.482V265.74z M443.596,261.151   c0,2.542-2.059,4.589-4.573,4.589h-32.011V155.706h32.011c2.515,0,4.573,2.052,4.573,4.582V261.151z M525.805,290.964   c0,0-20.6,1.869-42.983-3.27c-22.371-5.133-25.465-25.383-25.465-25.383v-83.385v-23.602h44.841   c13.031,0,23.602,10.568,23.602,23.602v112.037H525.805z" })))); };
var BusContainer = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  color: #2980bc;\n"], ["\n  display: flex;\n  align-items: center;\n  color: #2980bc;\n"])));
var Line = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  height: 1px;\n  width: 90%;\n  background: #2980bc;\n  border: none;\n  margin-right: 5px;\n"], ["\n  height: 1px;\n  width: 90%;\n  background: #2980bc;\n  border: none;\n  margin-right: 5px;\n"])));
exports.Bus = function () { return (React.createElement(BusContainer, null,
    React.createElement(Line, null),
    React.createElement(BusSvg, null))); };
var templateObject_1, templateObject_2;


/***/ }),

/***/ "./src/app/components/DepartureItem/DepartureItem.tsx":
/*!************************************************************!*\
  !*** ./src/app/components/DepartureItem/DepartureItem.tsx ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var mobx_react_1 = __webpack_require__(/*! mobx-react */ "./node_modules/mobx-react/index.module.js");
var styledComponents_1 = __webpack_require__(/*! ../styledComponents */ "./src/app/components/styledComponents.tsx");
var BusSvg_1 = __webpack_require__(/*! ../BusSvg */ "./src/app/components/BusSvg.tsx");
var getLocationById = function (locations, departureId) {
    return locations.filter(function (_a) {
        var id = _a.id;
        return id === departureId;
    })[0];
};
var getOperatorById = function (oporators, operatorId) {
    return oporators.filter(function (_a) {
        var id = _a.id;
        return id === operatorId;
    })[0];
};
var DepartureItem = /** @class */ (function (_super) {
    __extends(DepartureItem, _super);
    function DepartureItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DepartureItem.prototype.render = function () {
        var _a = this.props, store = _a.store, departure = _a.departure;
        var results = store.results;
        return results && (React.createElement(styledComponents_1.DepartureListItem, null,
            React.createElement(styledComponents_1.OperatorLogo, { backgroundImg: getOperatorById(results.operators, departure.operator_id).logo_url }),
            React.createElement(styledComponents_1.DepartureTimes, null,
                React.createElement("p", null,
                    React.createElement("b", null, departure.departure_time),
                    React.createElement("br", null),
                    getLocationById(results.locations, departure.origin_location_id).name),
                React.createElement("div", null,
                    React.createElement("h4", null, departure.duration),
                    React.createElement(BusSvg_1.Bus, null),
                    React.createElement("h4", null, departure.has_transfers || 'Non Stop')),
                React.createElement("p", null,
                    React.createElement("b", null,
                        departure.arrival_time,
                        " "),
                    React.createElement("br", null),
                    getLocationById(results.locations, departure.destination_location_id).name)),
            React.createElement(styledComponents_1.DeparturePrices, null,
                React.createElement(styledComponents_1.Button, null,
                    "$",
                    departure.totalPrice))));
    };
    DepartureItem = __decorate([
        mobx_react_1.inject('store'),
        mobx_react_1.observer
    ], DepartureItem);
    return DepartureItem;
}(React.Component));
exports.default = DepartureItem;


/***/ }),

/***/ "./src/app/components/Loader/Loader.tsx":
/*!**********************************************!*\
  !*** ./src/app/components/Loader/Loader.tsx ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var styled_components_1 = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.es.js");
var LoaderSvgContainer = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 60px;\n"], ["\n  width: 60px;\n"])));
exports.LoaderSvg = function () { return (React.createElement(LoaderSvgContainer, null,
    React.createElement("svg", { version: "1.1", id: "L7", xmlns: "http://www.w3.org/2000/svg", x: "0px", y: "0px", viewBox: "0 0 100 100" },
        React.createElement("path", { fill: "#fff", d: "M31.6,3.5C5.9,13.6-6.6,42.7,3.5,68.4c10.1,25.7,39.2,38.3,64.9,28.1l-3.1-7.9c-21.3,8.4-45.4-2-53.8-23.3\n        c-8.4-21.3,2-45.4,23.3-53.8L31.6,3.5z" },
            React.createElement("animateTransform", { attributeName: "transform", attributeType: "XML", type: "rotate", dur: "2s", from: "0 50 50", to: "360 50 50", repeatCount: "indefinite" })),
        React.createElement("path", { fill: "#fff", d: "M42.3,39.6c5.7-4.3,13.9-3.1,18.1,2.7c4.3,5.7,3.1,13.9-2.7,18.1l4.1,5.5c8.8-6.5,10.6-19,4.1-27.7\n        c-6.5-8.8-19-10.6-27.7-4.1L42.3,39.6z" },
            React.createElement("animateTransform", { attributeName: "transform", attributeType: "XML", type: "rotate", dur: "1s", from: "0 50 50", to: "-360 50 50", repeatCount: "indefinite" })),
        React.createElement("path", { fill: "#fff", d: "M82,35.7C74.1,18,53.4,10.1,35.7,18S10.1,46.6,18,64.3l7.6-3.4c-6-13.5,0-29.3,13.5-35.3s29.3,0,35.3,13.5\n        L82,35.7z" },
            React.createElement("animateTransform", { attributeName: "transform", attributeType: "XML", type: "rotate", dur: "2s", from: "0 50 50", to: "360 50 50", repeatCount: "indefinite" }))))); };
var templateObject_1;


/***/ }),

/***/ "./src/app/components/SearchForm/SearchForm.tsx":
/*!******************************************************!*\
  !*** ./src/app/components/SearchForm/SearchForm.tsx ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var mobx_react_1 = __webpack_require__(/*! mobx-react */ "./node_modules/mobx-react/index.module.js");
var styled_components_1 = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.es.js");
var Form = styled_components_1.default.form(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  margin-top: 50px;\n  display: flex;\n\n  > * {\n    margin: 0 5px;\n    padding: 10px;\n    background: none;\n    color: white;\n    border: 1px solid;\n  }\n"], ["\n  margin-top: 50px;\n  display: flex;\n\n  > * {\n    margin: 0 5px;\n    padding: 10px;\n    background: none;\n    color: white;\n    border: 1px solid;\n  }\n"])));
var SearchForm = /** @class */ (function (_super) {
    __extends(SearchForm, _super);
    function SearchForm() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            date: "2018-08-02",
            passangerNumber: 1,
        };
        _this.updatePassangerNumber = function (value) {
            _this.setState({
                passangerNumber: value,
            });
        };
        _this.updateDate = function (value) {
            _this.setState({
                date: value,
            });
        };
        _this.handleSubmit = function (event) {
            event.preventDefault();
            _this.props.store.search(_this.state.date, _this.state.passangerNumber);
        };
        return _this;
    }
    SearchForm.prototype.render = function () {
        var _this = this;
        var _a = this.state, date = _a.date, passangerNumber = _a.passangerNumber;
        return (React.createElement(Form, { onSubmit: this.handleSubmit },
            React.createElement("input", { type: "text", value: 'New York', onChange: function () { } }),
            React.createElement("input", { type: "text", value: 'Montreal', onChange: function () { } }),
            React.createElement("input", { type: 'date', value: date, onChange: function (e) { return _this.updateDate(e.target.value); } }),
            React.createElement("input", { type: 'number', value: passangerNumber, onChange: function (e) { return _this.updatePassangerNumber(e.target.value); } }),
            React.createElement("button", { role: "submit" }, " Search")));
    };
    SearchForm = __decorate([
        mobx_react_1.inject('store'),
        mobx_react_1.observer
    ], SearchForm);
    return SearchForm;
}(React.Component));
exports.default = SearchForm;
var templateObject_1;


/***/ }),

/***/ "./src/app/components/styledComponents.tsx":
/*!*************************************************!*\
  !*** ./src/app/components/styledComponents.tsx ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var styled_components_1 = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.es.js");
var formatBackgroundImage = function (imageUrl, width, height) {
    return imageUrl.replace(/{width}/, width).replace(/{height}/, height);
};
styled_components_1.injectGlobal(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    body {\n        margin: 0;\n        padding: 0;\n        font-family: 'IBM Plex Sans', sans-serif;\n        background:linear-gradient(180deg,#2880bc 0,#2880bc 22%,#7abdc3 33%,#9bbea5 44%,#d3ad6c 55%,#e7717f 72%,#e7717f); \n    }\n"], ["\n    body {\n        margin: 0;\n        padding: 0;\n        font-family: 'IBM Plex Sans', sans-serif;\n        background:linear-gradient(180deg,#2880bc 0,#2880bc 22%,#7abdc3 33%,#9bbea5 44%,#d3ad6c 55%,#e7717f 72%,#e7717f); \n    }\n"])));
exports.Root = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    min-height: 100vh;\n    display: flex;\n    justify-content: flex-end;\n    flex-direction: column;\n"], ["\n    min-height: 100vh;\n    display: flex;\n    justify-content: flex-end;\n    flex-direction: column;\n"])));
exports.Container = styled_components_1.default.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    padding: 20px;\n    max-width: 1080px;\n    margin: auto;\n    position: relative;\n"], ["\n    padding: 20px;\n    max-width: 1080px;\n    margin: auto;\n    position: relative;\n"])));
exports.DepartureListItem = styled_components_1.default.li(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    background: white;\n    padding: 0 30px;\n    width: 100%;\n    margin: 10px 0;\n    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);\n    transition: box-shadow 0.3s cubic-bezier(.25,.8,.25,1);\n    \n      \n    &:hover {\n        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);\n    }\n"], ["\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    background: white;\n    padding: 0 30px;\n    width: 100%;\n    margin: 10px 0;\n    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);\n    transition: box-shadow 0.3s cubic-bezier(.25,.8,.25,1);\n    \n      \n    &:hover {\n        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);\n    }\n"])));
exports.Ul = styled_components_1.default.ul(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n    padding: 0;\n    list-style: none;\n    display: flex;\n    flex-wrap: wrap;\n"], ["\n    padding: 0;\n    list-style: none;\n    display: flex;\n    flex-wrap: wrap;\n"])));
var typedOperatorLogo = styled_components_1.default.div;
exports.OperatorLogo = typedOperatorLogo(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n    background: url(", ");\n    background-repeat: no-repeat;\n    background-size: contain;\n    width: 120px;\n    height: 120px;\n"], ["\n    background: url(", ");\n    background-repeat: no-repeat;\n    background-size: contain;\n    width: 120px;\n    height: 120px;\n"])), function (props) { return formatBackgroundImage(props.backgroundImg, "120", "120"); });
exports.DepartureTimes = styled_components_1.default.div(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n    display: flex;\n    width: 70%;\n    justify-content: space-between;\n    align-items: center;\n    text-align: left;\n\n    > div {\n        padding-right: 15px;\n    }\n\n    p {\n        width: 30%;\n        font-size: 14px;\n    }\n\n    b {\n        font-size: 16px;\n    }\n\n    h4 {\n        font-size: 16px;\n        margin: 10px;\n    }\n"], ["\n    display: flex;\n    width: 70%;\n    justify-content: space-between;\n    align-items: center;\n    text-align: left;\n\n    > div {\n        padding-right: 15px;\n    }\n\n    p {\n        width: 30%;\n        font-size: 14px;\n    }\n\n    b {\n        font-size: 16px;\n    }\n\n    h4 {\n        font-size: 16px;\n        margin: 10px;\n    }\n"])));
exports.DeparturePrices = styled_components_1.default.div(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n    display: flex;\n"], ["\n    display: flex;\n"])));
exports.Footer = styled_components_1.default.footer(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n    min-height: 24vw;\n    background-image: url(oshegaFooter.png);\n    background-repeat: no-repeat;\n    background-size: 100% auto;\n"], ["\n    min-height: 24vw;\n    background-image: url(oshegaFooter.png);\n    background-repeat: no-repeat;\n    background-size: 100% auto;\n"])));
exports.Header = styled_components_1.default.header(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n    padding-top: 10vh;\n    display: flex;\n    justify-content: center;\n    flex-direction: column;\n    align-items: center;\n    height: 150px;\n"], ["\n    padding-top: 10vh;\n    display: flex;\n    justify-content: center;\n    flex-direction: column;\n    align-items: center;\n    height: 150px;\n"])));
exports.HeaderH1 = styled_components_1.default.h1(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n    padding-right: 15px;\n    color: #fff;\n"], ["\n    padding-right: 15px;\n    color: #fff;\n"])));
exports.Image = styled_components_1.default.img(templateObject_12 || (templateObject_12 = __makeTemplateObject(["\n    max-width: 100%;\n    height: 80px;\n"], ["\n    max-width: 100%;\n    height: 80px;\n"])));
exports.Button = styled_components_1.default.button(templateObject_13 || (templateObject_13 = __makeTemplateObject(["\n    font-size: 16px;\n    padding: 10px 20px;\n    border: none;\n    color: #0898bd;\n    cursor: pointer;\n    border: 1px solid;\n"], ["\n    font-size: 16px;\n    padding: 10px 20px;\n    border: none;\n    color: #0898bd;\n    cursor: pointer;\n    border: 1px solid;\n"])));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13;


/***/ }),

/***/ "./src/app/helpers/api.ts":
/*!********************************!*\
  !*** ./src/app/helpers/api.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var format = __webpack_require__(/*! date-fns/format */ "./node_modules/date-fns/format/index.js");
var endpoint = 'https://napi.busbud.com/x-departures';
var buildQuery = function (outboundDate, passangerNumber, origin, destination) {
    if (outboundDate === void 0) { outboundDate = "2018-08-02"; }
    if (origin === void 0) { origin = "dr5reg"; }
    if (destination === void 0) { destination = "f25dvk"; }
    return endpoint + "/" + origin + "/" + destination + "/" + outboundDate + (passangerNumber ? "?adult=" + passangerNumber : '');
};
var headers = {
    Accept: 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
    'X-Busbud-Token': 'PARTNER_JSWsVZQcS_KzxNRzGtIt1A'
};
exports.fetchSearch = function (outboundDate, passangerNumber) { return fetch(buildQuery(outboundDate, passangerNumber), { headers: headers }).then(function (res) { return res.json(); }); };
exports.adaptResponse = function (results) {
    return (__assign({}, results, { departures: results.departures.map(function (departure) {
            var hours = departure.duration / 60;
            var minutes = Math.round((hours - Math.floor(hours)) * 60);
            return __assign({}, departure, { arrival_time: format(departure.arrival_time, 'h:mm a'), departure_time: format(departure.departure_time, 'h:mm a'), totalPrice: (departure.prices.total / 100), duration: Math.round(hours) + "h " + minutes + "min" });
        }) }));
};


/***/ }),

/***/ "./src/app/store/search.ts":
/*!*********************************!*\
  !*** ./src/app/store/search.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var mobx_1 = __webpack_require__(/*! mobx */ "./node_modules/mobx/lib/mobx.module.js");
var api_1 = __webpack_require__(/*! ../helpers/api */ "./src/app/helpers/api.ts");
var SearchStore = /** @class */ (function () {
    function SearchStore() {
        var _this = this;
        this.isComplete = undefined;
        this.results = undefined;
        this.error = undefined;
        this.search = function (outboundDate, passangerNumber) { return __awaiter(_this, void 0, void 0, function () {
            var results, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        return [4 /*yield*/, api_1.fetchSearch(outboundDate, passangerNumber)];
                    case 1:
                        results = _a.sent();
                        this.isComplete = results.complete;
                        if (results.complete) {
                            this.isComplete = true;
                        }
                        return [2 /*return*/, this.results = api_1.adaptResponse(results)];
                    case 2:
                        error_1 = _a.sent();
                        this.isComplete = true;
                        this.error = error_1;
                        return [3 /*break*/, 4];
                    case 3:
                        mobx_1.when(function () { return !searchStore.isComplete; }, function () {
                            if (!searchStore.isComplete) {
                                setTimeout(function () { return searchStore.search(outboundDate, passangerNumber); }, 1000);
                            }
                        });
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
    }
    __decorate([
        mobx_1.observable
    ], SearchStore.prototype, "isComplete", void 0);
    __decorate([
        mobx_1.observable
    ], SearchStore.prototype, "results", void 0);
    __decorate([
        mobx_1.observable
    ], SearchStore.prototype, "error", void 0);
    __decorate([
        mobx_1.action
    ], SearchStore.prototype, "search", void 0);
    return SearchStore;
}());
exports.SearchStore = SearchStore;
var searchStore = new SearchStore();
exports.default = searchStore;


/***/ }),

/***/ "./src/browser.tsx":
/*!*************************!*\
  !*** ./src/browser.tsx ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var ReactDOM = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
var mobx_react_1 = __webpack_require__(/*! mobx-react */ "./node_modules/mobx-react/index.module.js");
var app_1 = __webpack_require__(/*! ./app/app */ "./src/app/app.tsx");
var search_1 = __webpack_require__(/*! ./app/store/search */ "./src/app/store/search.ts");
ReactDOM.hydrate(React.createElement(mobx_react_1.Provider, { store: search_1.default },
    React.createElement(app_1.default, null)), document.getElementById('app'));


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map