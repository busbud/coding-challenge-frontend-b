'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _reactLoaders = require('react-loaders');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SearchBar = function (_React$Component) {
    _inherits(SearchBar, _React$Component);

    function SearchBar(props) {
        _classCallCheck(this, SearchBar);

        return _possibleConstructorReturn(this, (SearchBar.__proto__ || Object.getPrototypeOf(SearchBar)).call(this, props));
    }

    _createClass(SearchBar, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                'div',
                { className: 'search-bar' },
                _react2.default.createElement(
                    'form',
                    { className: 'form-inline' },
                    _react2.default.createElement(
                        'div',
                        { className: 'row' },
                        _react2.default.createElement(
                            'div',
                            { className: 'form-group search__item col-md-4 col-xs-12' },
                            _react2.default.createElement(
                                'label',
                                { htmlFor: 'origin' },
                                'Origin'
                            ),
                            _react2.default.createElement(
                                'select',
                                { name: 'origin', id: 'origin', className: 'form-control search__field center-block' },
                                _react2.default.createElement(
                                    'option',
                                    { value: 'new-york' },
                                    'New-York'
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'form-group search__item col-md-4 col-xs-12' },
                            _react2.default.createElement(
                                'label',
                                { htmlFor: 'destination' },
                                'Destination'
                            ),
                            _react2.default.createElement('input', { type: 'text', className: 'form-control  center-block search__field', id: 'destination', placeholder: 'OSHEAGA !', disabled: true })
                        ),
                        _react2.default.createElement(
                            'div',
                            { id: 'search__button', className: 'form-group  center-block search__item col-md-4 col-xs-12' },
                            _react2.default.createElement(
                                'button',
                                { className: 'btn btn-warning search__field', onClick: function onClick() {
                                        _this2.props.onClick();
                                    } },
                                'Find my trip !'
                            )
                        )
                    )
                )
            );
        }
    }]);

    return SearchBar;
}(_react2.default.Component);

var ResultItem = function (_React$Component2) {
    _inherits(ResultItem, _React$Component2);

    function ResultItem(props) {
        _classCallCheck(this, ResultItem);

        return _possibleConstructorReturn(this, (ResultItem.__proto__ || Object.getPrototypeOf(ResultItem)).call(this, props));
    }

    _createClass(ResultItem, [{
        key: 'checkWifi',
        value: function checkWifi() {
            if (this.props.departure.amenities.wifi) {
                return _react2.default.createElement(
                    'i',
                    { className: 'fa fa-wifi info__item', 'aria-hidden': 'true', 'data-toggle': 'tooltip', 'data-placement': 'top', title: 'Wifi available !' },
                    ' '
                );
            }
        }
    }, {
        key: 'checkToilet',
        value: function checkToilet() {
            if (this.props.departure.amenities.toilet) {
                return _react2.default.createElement(
                    'i',
                    { className: 'fa fa-bath info__item', 'aria-hidden': 'true', 'data-toggle': 'tooltip', 'data-placement': 'top', title: 'Toilets available !' },
                    ' '
                );
            }
        }
    }, {
        key: 'checkAC',
        value: function checkAC() {
            if (this.props.departure.amenities.ac) {
                return _react2.default.createElement(
                    'i',
                    { className: 'fa fa-thermometer-empty info__item', 'aria-hidden': 'true', 'data-toggle': 'tooltip', 'data-placement': 'top', title: 'AC available !' },
                    ' '
                );
            }
        }
    }, {
        key: 'checkFood',
        value: function checkFood() {
            if (this.props.departure.amenities.food) {
                return _react2.default.createElement(
                    'i',
                    { className: 'fa fa-shopping-basket info__item', 'aria-hidden': 'true', 'data-toggle': 'tooltip', 'data-placement': 'top', title: 'Food available !' },
                    ' '
                );
            }
        }
    }, {
        key: 'checkTV',
        value: function checkTV() {
            if (this.props.departure.amenities.tv) {
                return _react2.default.createElement(
                    'i',
                    { className: 'fa fa-television info__item', 'aria-hidden': 'true', 'data-toggle': 'tooltip', 'data-placement': 'top', title: 'TV available !' },
                    ' '
                );
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'media' },
                _react2.default.createElement(
                    'div',
                    { className: 'media-left  media-middle' },
                    _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(
                            'p',
                            { className: 'text-center' },
                            ' ',
                            this.props.location_dep.name,
                            ' '
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-arrow-down fa-2x text-center', 'aria-hidden': 'true' })
                    ),
                    _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(
                            'p',
                            { className: 'text-center' },
                            ' ',
                            this.props.location_arr.name,
                            ' '
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'media-body' },
                    _react2.default.createElement(
                        'h4',
                        { className: 'info__group' },
                        _react2.default.createElement(
                            'p',
                            { id: 'price', className: 'info__item pull-right' },
                            ' ' + this.props.departure.prices.total / 100 + ' $CAD'
                        )
                    ),
                    _react2.default.createElement(
                        'h3',
                        { className: 'info__group center-block text-center' },
                        _react2.default.createElement(
                            'p',
                            { id: 'hours', className: 'info__item' },
                            ' ' + (0, _moment2.default)(this.props.departure.departure_time).format('hh:mmA') + ' - ' + (0, _moment2.default)(this.props.departure.arrival_time).format('hh:mmA')
                        )
                    ),
                    _react2.default.createElement(
                        'h5',
                        { className: 'info__icons center-block text-center' },
                        _react2.default.createElement(
                            'i',
                            { className: 'fa fa-clock-o info__item', 'aria-hidden': 'true' },
                            ' '
                        ),
                        this.checkWifi(),
                        this.checkToilet(),
                        this.checkAC(),
                        this.checkFood(),
                        this.checkTV()
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'media-right  media-middle' },
                    _react2.default.createElement('img', { className: 'media-object center-block', src: this.props.operator.logo_url })
                )
            );
        }
    }]);

    return ResultItem;
}(_react2.default.Component);

var ResultsList = function (_React$Component3) {
    _inherits(ResultsList, _React$Component3);

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

var Finder = function (_React$Component4) {
    _inherits(Finder, _React$Component4);

    function Finder() {
        _classCallCheck(this, Finder);

        var _this5 = _possibleConstructorReturn(this, (Finder.__proto__ || Object.getPrototypeOf(Finder)).call(this));

        _this5.i = 0;
        _this5.state = {
            value: 'init',
            message: ''
        };
        return _this5;
    }

    _createClass(Finder, [{
        key: 'callApi',
        value: function callApi(index) {
            var _this6 = this;

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
                var new_operators = _this6.state.operators ? _this6.state.operators.concat(response.operators) : response.operators;
                var new_locations = _this6.state.locations ? _this6.state.locations.concat(response.locations) : response.locations;
                var new_departures = _this6.state.departures ? _this6.state.departures.concat(response.departures) : response.departures;
                _this6.setState({
                    value: 'found',
                    message: 'Résultats trouvées',
                    operators: new_operators,
                    locations: new_locations,
                    departures: new_departures
                });
                if (!response.complete) {
                    _this6.i++;
                    console.info('this.i incremented : ' + _this6.i);
                    _this6.callApi('&index=' + _this6.i);
                } else {
                    console.info('Complete : ' + response.complete);
                    //If complete but no result, launch again
                    if (typeof _this6.state.operators == 'undefined' || _this6.state.operators.length < 1) {
                        console.log('Launch again the callApi');
                        _this6.callApi('');
                    } else {
                        console.log('We don\'t launch again since this.state.operators : ' + _this6.state.operators);
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
                console.log('this.state.operators is not defined');
                this.setState({
                    value: 'clicked',
                    message: 'En attente des résultats'
                });
                this.callApi('');
            } else if (this.state.operators.length < 1) {
                console.log('this.state.operators is defined but empty');
                this.callApi('');
            } else {
                console.log('this.state.operators is defined : ' + this.state.operators);
            }
        }
    }, {
        key: 'renderLoader',
        value: function renderLoader() {
            return _react2.default.createElement(_reactLoaders.Loader, { type: 'line-scale', active: 'true' });
        }
    }, {
        key: 'setMessage',
        value: function setMessage() {
            if (this.state.value == 'clicked') {
                //return <Loader type="pacman" />;
                return _react2.default.createElement(
                    'p',
                    null,
                    ' En attente des r\xE9sultats '
                );
            } else if (this.state.value == 'found') {
                console.log('On est dans le found avec value : ' + this.state.value + ' et operators : ' + this.state.operators);
                //return <Loader type="line-scale" active="true" />;
                return _react2.default.createElement(ResultsList, { operators: this.state.operators, departures: this.state.departures, locations: this.state.locations });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this7 = this;

            return _react2.default.createElement(
                'div',
                { className: 'finder' },
                _react2.default.createElement(SearchBar, { onClick: function onClick() {
                        return _this7.startResearch();
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