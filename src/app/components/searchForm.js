import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class SearchForm extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      requestData: {
        cityFrom: 'dr5reg',
        cityTo: 'f25dvk'
      }
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  }

  static defaultProps = {
    onSubmit: () => {}
  }

  handleSubmit() {
    this.props.onSubmit(this.state.requestData);
  }

  render() {
    return (
      <div className="nymo-search-form">
        <div className="nymo-search-form__from">
          <input className="input" type="text" placeholder="From"/>
          <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
          </ul>
        </div>
        <div className="nymo-search-form__to">
          <input className="input" type="text" placeholder="To"/>
          <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
          </ul>
        </div>
        <button
          className="nymo-search-form__submit button"
          onClick={this.handleSubmit}
          >
          Search
        </button>
      </div>
    );
  }
}
