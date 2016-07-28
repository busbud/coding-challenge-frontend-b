/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(1);
	var ReactDOM = __webpack_require__(2);
	var $ = __webpack_require__(3);
	var _ = __webpack_require__(4);
	var Labeled = (function (_super) {
	    __extends(Labeled, _super);
	    function Labeled() {
	        _super.apply(this, arguments);
	    }
	    Labeled.prototype.render = function () {
	        var p = this.props;
	        return (React.createElement("div", {className: "form-group"}, React.createElement("label", {htmlFor: p.ID, className: "col-sm-2 control-label"}, p.label), React.createElement("div", {className: "col-sm-10"}, this.props.children)));
	    };
	    return Labeled;
	}(React.Component));
	var BusBud = (function (_super) {
	    __extends(BusBud, _super);
	    function BusBud(props) {
	        var _this = this;
	        _super.call(this, props);
	        this.locationById = function (id) {
	            return _.find(_this.state.returnData.locations, function (l) { return l.id == id; });
	        };
	        this.onSuccess = function (url, params, start, firstTime) {
	            return function (data, textStatus, jqXHR) {
	                var newState = null;
	                if (firstTime) {
	                    newState = { returnData: data };
	                }
	                else {
	                    newState = _.cloneDeep(_this.state);
	                    Array.prototype.push.apply(newState.returnData.departures, data.departures);
	                }
	                if (!data.complete) {
	                    var idx = newState.returnData.departures.length;
	                    _this.setState(newState);
	                    _this.request(url, params, idx, false);
	                }
	                else {
	                    _this.setState(newState);
	                }
	            };
	        };
	        this.request = function (url, params, start, firstTime) {
	            var settings = {
	                headers: {
	                    Accept: 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/'
	                },
	                success: _this.onSuccess(url, params, start, firstTime),
	                error: function (jqXHR, textStatus, errorThrown) {
	                    console.log(textStatus, errorThrown);
	                },
	                dateType: "json"
	            };
	            var url1 = firstTime ? url + params : url + '/poll' + params + '&index=' + start;
	            $.ajax(url1, settings);
	        };
	        this.handleClick = function (e) {
	            var d = {};
	            'origin destination outbound_date adults lang'.split(' ').map(function (id, i, a) { return d[id] = $('#' + id).val(); });
	            var url = "https://napi.busbud.com/x-departures/" + d.origin + "/" + d.destination + "/" + d.outbound_date;
	            var params = "?adult=" + d.adults + "&lang=" + d.lang;
	            _this.request(url, params, 0, true);
	        };
	        this.state = {
	            returnData: {
	                departures: [],
	                locations: [],
	                complete: false,
	            },
	            langs: []
	        };
	    }
	    BusBud.prototype.render = function () {
	        var _this = this;
	        var data = [
	            ["origin", "From", React.createElement("select", {className: "form-control", id: "origin"}, React.createElement("option", {value: "dr5reg"}, "New York"))],
	            ["destination", "To", React.createElement("select", {className: "form-control", id: "destination"}, React.createElement("option", {value: "f25dvk"}, "Montréal"))],
	            ["outbound_date", "Date", React.createElement("input", {type: "text", id: "outbound_date", className: "form-control"})],
	            ["adults", "Adults", React.createElement("input", {type: "text", id: "adults", className: "form-control", defaultValue: "1"})],
	            ["lang", "Language",
	                React.createElement("select", {className: "form-control", id: "lang"}, this.state.langs.map(function (lang, i) {
	                    return React.createElement("option", {value: lang.Code, key: i}, lang.Name);
	                }))
	            ],
	            ["submit", "", React.createElement("button", {type: "button", className: "btn btn-default", onClick: this.handleClick}, "Submit")]
	        ];
	        return React.createElement("div", null, React.createElement("form", {className: "form-horizontal"}, data.map(function (d, i) { return React.createElement(Labeled, {ID: d[0], label: d[1], key: i}, d[2]); })), React.createElement("table", {className: "table table-striped table-bordered"}, React.createElement("tbody", null, React.createElement("tr", null, 'Departure Time,Arrival Time,Origin,Destination,Price'.split(',').map(function (s, i) { return React.createElement("th", {key: i}, s); })), this.state.returnData.departures.map(function (dep, i) { return React.createElement("tr", {key: i}, React.createElement("td", null, dep.departure_time), React.createElement("td", null, dep.arrival_time), React.createElement("td", null, _this.locationById(dep.origin_location_id).name), React.createElement("td", null, _this.locationById(dep.destination_location_id).name), React.createElement("td", null, dep.prices.total)); }))));
	    };
	    BusBud.prototype.componentDidMount = function () {
	        var _this = this;
	        $('#outbound_date').datepicker({
	            dateFormat: 'yy-mm-dd',
	            defaultDate: +1
	        });
	        $.get('lang.json', function (data) {
	            _this.setState({ 'langs': data });
	        });
	    };
	    return BusBud;
	}(React.Component));
	ReactDOM.render(React.createElement(BusBud, null), document.getElementById("react_div"));


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = ReactDOM;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = $;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = _;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map