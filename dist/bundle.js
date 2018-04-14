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
var components_1 = __webpack_require__(/*! ./components/components */ "./src/app/components/components.tsx");
var formatBackgroundImage = function (imageUrl, width, height) {
    var url = imageUrl.replace(/{width}/, width);
    url.replace(/{width}/, width);
    url.replace(/{height}/, height);
    console.log(url);
    return url;
};
var getLocationById = function (locations, departureId) {
    return locations.filter(function (_a) {
        var id = _a.id;
        return id === departureId;
    });
};
var getOperatorById = function (oporators, operatorId) {
    return oporators.filter(function (_a) {
        var id = _a.id;
        return id === operatorId;
    });
};
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    App.prototype.render = function () {
        var _a = this.props.store, search = _a.search, results = _a.results, isComplete = _a.isComplete;
        return (React.createElement(components_1.Root, null,
            React.createElement(components_1.Header, null,
                React.createElement(components_1.HeaderH1, null, "Its Time to book for"),
                React.createElement(components_1.Image, { src: 'osheaga.png' })),
            React.createElement(components_1.Header, null,
                React.createElement(components_1.Button, { onClick: function () { return search(); } }, "Lets Go!")),
            results && (React.createElement(components_1.Container, null,
                React.createElement(components_1.Ul, null, results.cities.map(function (city) {
                    return React.createElement(components_1.CitiesListItem, { key: city.id, backgroundImg: formatBackgroundImage(city.image_url, "400", "400") },
                        React.createElement("h3", null, city.full_name));
                })),
                React.createElement("h3", null, "isLoaded: " + isComplete),
                React.createElement(components_1.Ul, null, results.departures.map(function (departure) {
                    return React.createElement(components_1.DepartureListItem, { key: departure.id },
                        React.createElement("div", null,
                            React.createElement(components_1.Image, { src: getOperatorById(results.operators, departure.operator_id)[0].logo_url })),
                        React.createElement("div", null,
                            React.createElement("span", null,
                                React.createElement("b", null,
                                    departure.departure_time,
                                    ": "),
                                getLocationById(results.locations, departure.origin_location_id)[0].name),
                            React.createElement("h2", null, departure.duration),
                            React.createElement("span", null,
                                React.createElement("b", null,
                                    departure.arrival_time,
                                    ": "),
                                getLocationById(results.locations, departure.destination_location_id)[0].name)),
                        React.createElement("div", null,
                            React.createElement("span", null,
                                "Price: $",
                                departure.totalPrice)));
                })))),
            React.createElement(components_1.Footer, null)));
    };
    App = __decorate([
        mobx_react_1.inject('store'),
        mobx_react_1.observer
    ], App);
    return App;
}(React.Component));
exports.default = App;


/***/ }),

/***/ "./src/app/components/components.tsx":
/*!*******************************************!*\
  !*** ./src/app/components/components.tsx ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var styled_components_1 = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.es.js");
styled_components_1.injectGlobal(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    body {\n        margin: 0;\n        padding: 0;\n        font-family: sans-serif;\n        background:linear-gradient(180deg,#2880bc 0,#2880bc 22%,#7abdc3 33%,#9bbea5 44%,#d3ad6c 55%,#e7717f 72%,#e7717f); \n        // background: linear-gradient(rgb(14, 138, 197), rgb(7, 155, 188), rgb(117, 205, 245));\n    }\n"], ["\n    body {\n        margin: 0;\n        padding: 0;\n        font-family: sans-serif;\n        background:linear-gradient(180deg,#2880bc 0,#2880bc 22%,#7abdc3 33%,#9bbea5 44%,#d3ad6c 55%,#e7717f 72%,#e7717f); \n        // background: linear-gradient(rgb(14, 138, 197), rgb(7, 155, 188), rgb(117, 205, 245));\n    }\n"])));
exports.Root = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    min-height: 100vh;\n    display: flex;\n    justify-content: flex-end;\n    flex-direction: column;\n"], ["\n    min-height: 100vh;\n    display: flex;\n    justify-content: flex-end;\n    flex-direction: column;\n"])));
exports.Container = styled_components_1.default.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    padding: 20px;\n"], ["\n    padding: 20px;\n"])));
exports.DepartureListItem = styled_components_1.default.li(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    display: flex;\n    justify-content: space-between;\n    background: white;\n    padding: 20px;\n    width: 100%;\n    margin: 10px 0;\n"], ["\n    display: flex;\n    justify-content: space-between;\n    background: white;\n    padding: 20px;\n    width: 100%;\n    margin: 10px 0;\n"])));
exports.Ul = styled_components_1.default.ul(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n    padding: 0;\n    list-style: none;\n    display: flex;\n    flex-wrap: wrap;\n"], ["\n    padding: 0;\n    list-style: none;\n    display: flex;\n    flex-wrap: wrap;\n"])));
var typedCitiesListItem = styled_components_1.default.li;
exports.CitiesListItem = typedCitiesListItem(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n    flex: 1;\n    min-height: 200px;\n    background: url(", ");\n    background-size: cover;\n\n    display: flex;\n    align-items: center;\n    justify-content: center;\n\n    > h3 {\n        text-align: center;\n    }\n"], ["\n    flex: 1;\n    min-height: 200px;\n    background: url(", ");\n    background-size: cover;\n\n    display: flex;\n    align-items: center;\n    justify-content: center;\n\n    > h3 {\n        text-align: center;\n    }\n"])), function (props) { return props.backgroundImg; });
exports.Footer = styled_components_1.default.footer(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n    min-height: 35vw;\n    background-image: url(oshegaFooter.png);\n    background-repeat: no-repeat;\n    background-size: 100% auto;\n"], ["\n    min-height: 35vw;\n    background-image: url(oshegaFooter.png);\n    background-repeat: no-repeat;\n    background-size: 100% auto;\n"])));
exports.Header = styled_components_1.default.header(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n    display: flex;\n    justify-content: center;\n    flex-direction: column;\n    align-items: center;\n    height: 150px;\n"], ["\n    display: flex;\n    justify-content: center;\n    flex-direction: column;\n    align-items: center;\n    height: 150px;\n"])));
exports.HeaderH1 = styled_components_1.default.h1(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n    padding-right: 15px;\n    color: #fff;\n    font-family: sans-serif;\n"], ["\n    padding-right: 15px;\n    color: #fff;\n    font-family: sans-serif;\n"])));
exports.Image = styled_components_1.default.img(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n    max-width: 100%;\n    height: 80px;\n"], ["\n    max-width: 100%;\n    height: 80px;\n"])));
exports.Button = styled_components_1.default.button(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n    font-size: 16px;\n    padding: 10px 20px;\n    border: none;\n    color: #0898bd;\n"], ["\n    font-size: 16px;\n    padding: 10px 20px;\n    border: none;\n    color: #0898bd;\n"])));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11;


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
var endpoint = 'https://napi.busbud.com/x-departures';
var buildQuery = function (origin, destination, outboundDate) {
    if (origin === void 0) { origin = "dr5reg"; }
    if (destination === void 0) { destination = "f25dvk"; }
    if (outboundDate === void 0) { outboundDate = "2018-08-02"; }
    return endpoint + "/" + origin + "/" + destination + "/" + outboundDate;
};
var headers = {
    Accept: 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
    'X-Busbud-Token': 'PARTNER_JSWsVZQcS_KzxNRzGtIt1A'
};
exports.fetchSearch = function () { return fetch(buildQuery(), { headers: headers }).then(function (res) { return res.json(); }); };
exports.adaptResponse = function (results) {
    return (__assign({}, results, { departures: results.departures.map(function (departure) { return (__assign({}, departure, { arrival_time: new Date(departure.arrival_time).getHours(), departure_time: new Date(departure.departure_time).getHours(), totalPrice: (departure.prices.total / 100), duration: departure.duration / 60 })); }) }));
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
        this.requestStatus = 'INPROGRESS';
        this.isComplete = undefined;
        this.results = undefined;
        this.search = function () { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            var results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, , 2, 3]);
                        return [4 /*yield*/, api_1.fetchSearch()];
                    case 1:
                        results = _a.sent();
                        this.isComplete = results.complete;
                        console.log(results.complete);
                        console.log(results);
                        if (results.complete) {
                            this.isComplete = true;
                            this.requestStatus = 'RESOLVED';
                        }
                        return [2 /*return*/, this.results = api_1.adaptResponse(results)];
                    case 2:
                        mobx_1.when(function () { return !searchStore.isComplete; }, function () {
                            if (!_this.isComplete) {
                                setTimeout(function () { return searchStore.search(); }, 2000);
                            }
                        }, { name: 'polling search' });
                        return [7 /*endfinally*/];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
    }
    __decorate([
        mobx_1.observable
    ], SearchStore.prototype, "requestStatus", void 0);
    __decorate([
        mobx_1.observable
    ], SearchStore.prototype, "isComplete", void 0);
    __decorate([
        mobx_1.observable
    ], SearchStore.prototype, "results", void 0);
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