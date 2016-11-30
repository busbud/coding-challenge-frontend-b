'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function SearchBar(props) {
    return _react2.default.createElement(
        'div',
        { className: 'search-bar' },
        _react2.default.createElement(
            'form',
            { className: 'form-inline' },
            _react2.default.createElement(
                'div',
                { className: 'form-group' },
                _react2.default.createElement(
                    'label',
                    { htmlFor: 'origin' },
                    'Origin'
                ),
                _react2.default.createElement('input', { type: 'text', className: 'form-control', id: 'origin', placeholder: 'New York' })
            ),
            _react2.default.createElement(
                'div',
                { className: 'form-group' },
                _react2.default.createElement(
                    'label',
                    { htmlFor: 'destination' },
                    'Destination'
                ),
                _react2.default.createElement('h4', { className: 'form-control', id: 'destination' }),
                ' OSHEAGA'
            ),
            _react2.default.createElement(
                'button',
                { className: 'btn btn-warning', onClick: function onClick() {
                        props.onClick();
                    } },
                'Find my trip !'
            )
        )
    );
}

function ResultItem(props) {
    return _react2.default.createElement(
        'div',
        { className: 'media' },
        _react2.default.createElement(
            'div',
            { className: 'media-right  media-middle' },
            _react2.default.createElement(
                'h4',
                null,
                ' ',
                props.location_dep.name,
                ' '
            ),
            _react2.default.createElement(
                'h4',
                null,
                ' ',
                props.location_arr.name,
                ' '
            )
        ),
        _react2.default.createElement(
            'div',
            { className: 'media-body' },
            _react2.default.createElement(
                'h4',
                { className: 'media-heading' },
                props.departure.departure_time + ' - ' + props.departure.arrival_time
            ),
            _react2.default.createElement(
                'p',
                null,
                ' Blabla '
            )
        ),
        _react2.default.createElement(
            'div',
            { className: 'media-right  media-middle' },
            _react2.default.createElement('img', { className: 'media-object', src: props.operator.logo_url })
        )
    );
}

var ResultsList = function (_React$Component) {
    _inherits(ResultsList, _React$Component);

    function ResultsList(props) {
        _classCallCheck(this, ResultsList);

        return _possibleConstructorReturn(this, (ResultsList.__proto__ || Object.getPrototypeOf(ResultsList)).call(this, props));
    }

    _createClass(ResultsList, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'ul',
                { className: 'media-list' },
                this.props.departures.map(function (depart) {
                    var dep_op = this.props.operators.find(function (op) {
                        return op.id == depart.operator_id;
                    });
                    var dep_loc = this.props.locations.find(function (loc) {
                        return loc.id == depart.origin_location_id;
                    });
                    var arr_loc = this.props.locations.find(function (loc) {
                        return loc.id == depart.destination_location_id;
                    });
                    return _react2.default.createElement(ResultItem, { departure: depart, operator: dep_op, location_dep: dep_loc, location_arr: arr_loc });
                }, this)
            );
        }
    }]);

    return ResultsList;
}(_react2.default.Component);

var Finder = function (_React$Component2) {
    _inherits(Finder, _React$Component2);

    function Finder() {
        _classCallCheck(this, Finder);

        var _this2 = _possibleConstructorReturn(this, (Finder.__proto__ || Object.getPrototypeOf(Finder)).call(this));

        _this2.i = 0;
        _this2.state = {
            value: 'init',
            message: ''
        };
        return _this2;
    }

    _createClass(Finder, [{
        key: 'callApi',
        value: function callApi(index) {
            var _this3 = this;

            var poll = '';
            if (index == '') {
                console.log('First callApi : ');
                this.i = 0;
            } else {
                poll = '/poll';
                console.log('Multimple callApi : ' + index);
            }
            var url = 'https://napi.busbud.com/x-departures/dr5reg/f25dvk/2017-03-01' + poll + '?adult=1&child=0&senior=0&lang=CA&currency=CAD' + index;
            console.info('called url : ' + url);
            fetch(url, {
                headers: {
                    'Accept': 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
                    'x-busbud-token': 'PARTNER_JSWsVZQcS_KzxNRzGtIt1A'
                }
            }).then(function (response) {
                return response.json();
            }).then(function (responseJson) {
                console.log(JSON.stringify(responseJson));
                var response = responseJson;
                var new_operators = _this3.state.operators ? _this3.state.operators.concat(response.operators) : response.operators;
                var new_locations = _this3.state.locations ? _this3.state.locations.concat(response.locations) : response.locations;
                var new_departures = _this3.state.departures ? _this3.state.departures.concat(response.departures) : response.departures;
                _this3.setState({
                    value: 'found',
                    message: 'Résultats trouvées',
                    operators: new_operators,
                    locations: new_locations,
                    departures: new_departures
                });
                if (!response.complete) {
                    _this3.i++;
                    console.info('this.i incremented : ' + _this3.i);
                    _this3.callApi('&index=' + _this3.i);
                } else {
                    console.info('Complete : ' + response.complete);
                    //If complete but no result, launch again
                    if (typeof _this3.state.operators == 'undefined') {
                        _this3.callApi('');
                    }
                }
            }).catch(function (error) {
                console.error(error);
            });
        }
    }, {
        key: 'startResearch',
        value: function startResearch() {
            if (typeof this.state.operators == 'undefined') {
                this.setState({
                    value: 'clicked',
                    message: 'En attente des résultats'
                });
                this.callApi('');
            }
        }
    }, {
        key: 'setMessage',
        value: function setMessage() {
            if (this.state.value == 'clicked') {
                return _react2.default.createElement(
                    'p',
                    null,
                    ' ',
                    this.state.message,
                    ' '
                );
            } else if (this.state.value == 'found') {
                console.log('On est dans le found avec value : ' + this.state.value + ' et operators : ' + this.state.operators);
                return _react2.default.createElement(ResultsList, { operators: this.state.operators, departures: this.state.departures, locations: this.state.locations });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            return _react2.default.createElement(
                'div',
                { className: 'finder' },
                _react2.default.createElement(SearchBar, { onClick: function onClick() {
                        return _this4.startResearch();
                    } }),
                _react2.default.createElement(
                    'div',
                    { className: 'results-list', id: 'resultsList' },
                    this.setMessage()
                )
            );
        }
    }]);

    return Finder;
}(_react2.default.Component);

//------------------------------------------------


_reactDom2.default.render(_react2.default.createElement(Finder, null), document.getElementById('container'));