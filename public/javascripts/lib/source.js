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
                { className: 'btn btn-default', onClick: function onClick() {
                        props.onClick();
                    } },
                'Find my trip !'
            )
        )
    );
}

function ResultsItem(props) {
    return _react2.default.createElement(
        'p',
        null,
        ' Result '
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
                null,
                this.props.list.map(function (listValue) {
                    console.info('listValue : ' + JSON.stringify(listValue));
                    return _react2.default.createElement(
                        'li',
                        { key: listValue.title.toString() },
                        ' ',
                        listValue.title.toString() + '  (' + listValue.releaseYear.toString() + ')',
                        ' '
                    );
                })
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

        _this2.state = {
            value: 'init',
            message: ''
        };
        return _this2;
    }

    _createClass(Finder, [{
        key: 'getMoviesFromApiAsync',
        value: function getMoviesFromApiAsync() {
            var _this3 = this;

            this.setState({
                value: 'clicked',
                message: 'En attente des résultats'
            });
            return fetch('https://facebook.github.io/react-native/movies.json').then(function (response) {
                return response.json();
            }).then(function (responseJson) {
                var movies = Array.from(responseJson.movies);
                _this3.movies = movies;
                _this3.setState({
                    value: 'found',
                    message: 'Résultats trouvées'
                });
            }).catch(function (error) {
                console.error(error);
            });
        }
    }, {
        key: 'setMessage',
        value: function setMessage() {
            if (this.state.value == 'clicked') {
                console.log('On est dans le if avec value : ' + this.state.value + ' et message : ' + this.state.message);
                return _react2.default.createElement(
                    'p',
                    null,
                    ' ',
                    this.state.message,
                    ' '
                );
            } else if (this.state.value == 'found') {
                console.log('On est dans le found avec value : ' + this.state.value + ' et movies : ' + this.movies);
                return _react2.default.createElement(ResultsList, { list: this.movies });
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
                        return _this4.getMoviesFromApiAsync();
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