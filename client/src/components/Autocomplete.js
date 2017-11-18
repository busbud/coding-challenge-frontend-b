import React, { Component } from 'react'
import Autosuggest from 'react-autosuggest';
import './Autocomplete.css'

class Autocomplete extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      suggestions: this.props.suggestions || []
    };
  }

  // Teach Autosuggest how to calculate suggestions for any given input value.
  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : this.props.suggestions.filter(lang =>
      lang.name.toLowerCase().slice(0, inputLength) === inputValue
    );
  };
  getSuggestionValue = suggestion => suggestion.name;

  renderSuggestion = suggestion => (
    <div>
      {suggestion.name}
    </div>
  );

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  render(){

    const { value, suggestions } = this.state;
    const { placeholder } = this.props

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      ...this.props,
      value,
      onChange: this.onChange
    };

    return <div>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
      />
    </div>
  }

}

export default Autocomplete