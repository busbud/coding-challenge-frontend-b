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

        var _this = _possibleConstructorReturn(this, (SearchBar.__proto__ || Object.getPrototypeOf(SearchBar)).call(this, props));

        _this.state = {
            wifi: false,
            ac: false,
            toilet: false,
            tv: false
        };
        return _this;
    }

    _createClass(SearchBar, [{
        key: 'click',
        value: function click(type) {
            this.setState({
                wifi: this.props.wifiFilter,
                ac: this.props.acFilter,
                toilet: this.props.toiletFilter,
                tv: this.props.tvFilter
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                'div',
                { className: 'search-bar' },
                _react2.default.createElement(
                    'div',
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
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'row' },
                        _react2.default.createElement(
                            'div',
                            { className: 'form-group search__item col-xs-6' },
                            _react2.default.createElement(
                                'div',
                                { className: 'btn-group filter__group pull-right' },
                                _react2.default.createElement(
                                    'label',
                                    null,
                                    'Pr\xE9f\xE9rences : '
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'form-group search__item col-xs-6' },
                            _react2.default.createElement(
                                'div',
                                { className: 'btn-group filter__group' },
                                _react2.default.createElement(
                                    'div',
                                    { className: "btn btn-default filter__button " + (this.props.wifiFilter ? "active" : ""), onClick: function onClick() {
                                            _this2.props.onWifiFilter();_this2.click('wifi');
                                        } },
                                    _react2.default.createElement('i', { className: 'fa fa-wifi' })
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: "btn btn-default filter__button " + (this.props.toiletFilter ? "active" : ""), onClick: function onClick() {
                                            _this2.props.onToiletFilter();_this2.click('toilet');
                                        } },
                                    _react2.default.createElement('i', { className: 'fa fa-bath' })
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: "btn btn-default filter__button " + (this.props.acFilter ? "active" : ""), onClick: function onClick() {
                                            _this2.props.onACFilter();_this2.click('ac');
                                        } },
                                    _react2.default.createElement('i', { className: 'fa fa-thermometer-empty' })
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: "btn btn-default filter__button " + (this.props.tvFilter ? "active" : ""), onClick: function onClick() {
                                            _this2.props.onTVFilter();_this2.click('tv');
                                        } },
                                    _react2.default.createElement('i', { className: 'fa fa-television' })
                                )
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
        key: 'hideOnFilter',
        value: function hideOnFilter() {
            var filters = ['wifi', 'toilet', 'ac', 'tv'];
            var hide = false;
            filters.map(function (filter) {
                console.info('Filter, in map with filter = ' + filter);
                console.info('this.props[filter+"Filter"] : ' + this.props[filter + 'Filter']);
                if (this.props[filter + 'Filter']) {
                    console.log('A filter is active : ' + filter);
                    if (!this.props.departure.amenities[filter]) {
                        console.log('The filter hide a departure');
                        hide = true;
                    }
                }
            }, this);
            return hide ? 'media hidden' : 'media';
        }
    }, {
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
                { className: this.hideOnFilter() },
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
                    return _react2.default.createElement(ResultItem, { departure: depart, operator: dep_op, location_dep: dep_loc, location_arr: arr_loc, wifiFilter: this.props.wifiFilter, acFilter: this.props.acFilter, toiletFilter: this.props.toiletFilter, tvFilter: this.props.tvFilter });
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
            active: false,
            value: 'init',
            wifiFilter: false,
            acFilter: false,
            tvFilter: false,
            toiletFilter: false,
            message: '',
            operators: [],
            locations: [],
            departures: []
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
                    active: false,
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
            if (this.state.operators.length < 1) {
                console.log('this.state.operators is defined but empty');
                this.setState({
                    active: true,
                    value: 'clicked',
                    message: 'En attente des résultats'
                });
                this.callApi('');
                this.callApi('');
            } else {
                console.log('this.state.operators is defined : ' + this.state.operators);
            }
        }
    }, {
        key: 'renderLoader',
        value: function renderLoader() {
            if (this.state.active) {
                return _react2.default.createElement(
                    'div',
                    { className: 'loader-container' },
                    _react2.default.createElement(
                        'h4',
                        { className: 'text-center' },
                        ' En attente de r\xE9sultats...'
                    )
                );
            }
        }
    }, {
        key: 'setMessage',
        value: function setMessage() {
            console.log('On est dans le found avec value : ' + this.state.value + ' et operators : ' + this.state.operators);
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    { className: 'loader__container' },
                    this.renderLoader()
                ),
                _react2.default.createElement(ResultsList, { operators: this.state.operators, departures: this.state.departures, locations: this.state.locations, wifiFilter: this.state.wifiFilter, acFilter: this.state.acFilter, toiletFilter: this.state.toiletFilter, tvFilter: this.state.tvFilter }),
                ';'
            );
        }
    }, {
        key: 'wifiFiltering',
        value: function wifiFiltering() {
            var boo = this.state.wifiFilter ? false : true;
            this.setState({
                wifiFilter: boo
            });
        }
    }, {
        key: 'acFiltering',
        value: function acFiltering() {
            var boo = this.state.acFilter ? false : true;
            this.setState({
                acFilter: boo
            });
        }
    }, {
        key: 'tvFiltering',
        value: function tvFiltering() {
            var boo = this.state.tvFilter ? false : true;
            this.setState({
                tvFilter: boo
            });
        }
    }, {
        key: 'toiletFiltering',
        value: function toiletFiltering() {
            var boo = this.state.toiletFilter ? false : true;
            this.setState({
                toiletFilter: boo
            });
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
                    }, onWifiFilter: function onWifiFilter() {
                        return _this7.wifiFiltering();
                    }, onACFilter: function onACFilter() {
                        return _this7.acFiltering();
                    }, onTVFilter: function onTVFilter() {
                        return _this7.tvFiltering();
                    }, onToiletFilter: function onToiletFilter() {
                        return _this7.toiletFiltering();
                    }, wifiFilter: this.state.wifiFilter, toiletFilter: this.state.toiletFilter, acFilter: this.state.acFilter, tvFilter: this.state.tvFilter }),
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