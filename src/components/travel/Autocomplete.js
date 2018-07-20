import React, { Component } from "react";
import PropTypes from "prop-types";
// Third party libraries
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
// Other imports
import Http from "./../../api/http";
// Inner imports
import "./Autocomplete.css";

class Autocomplete extends Component {
  state = {
    suggestions: [],
    displaySuggestions: false
  };

  selectTown = (geohash, name) => {
    this.setState({
      displaySuggestions: false
    });
    this.props.onSelection({
      inputId: this.props.inputId,
      geohash,
      name
    });
  };

  componentWillReceiveProps({ partialText }) {
    var self = this;

    self.setState({
      displaySuggestions: true
    });

    Http.getMatchedTowns(partialText).then(townsFound => {
      let displaySuggestions = true;
      if (
        townsFound.length === 0 ||
        townsFound[0].full_name.split(",")[0] === partialText
      ) {
        displaySuggestions = false;
      }
      self.setState({
        suggestions: townsFound,
        displaySuggestions
      });
    });
  }

  render() {
    const { suggestions, displaySuggestions } = this.state;

    return (
      <Paper
        square
        className={displaySuggestions ? "" : "autoc__suggestions--hidden"}
      >
        {suggestions.map((suggestion, index) => {
          const name = suggestion.full_name.split(",")[0];
          return (
            <MenuItem
              key={index}
              component="div"
              onClick={() => this.selectTown(suggestion.geohash, name)}
            >
              <Typography>{name}</Typography>
            </MenuItem>
          );
        })}
      </Paper>
    );
  }
}

Autocomplete.propTypes = PropTypes.shape({
  partialText: PropTypes.string,
  onSelection: PropTypes.func.isRequired,
  inputId: PropTypes.string.isRequired
}).isRequired;

export default Autocomplete;
