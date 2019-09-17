import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import '../styles/search.scss';

const SearchBox = props => (
  <div className="searchBox">
    <TextField
      disabled
      id="standard-disabled"
      label="From"
      defaultValue="New York"
      margin="normal"
    />
    <TextField
      disabled
      id="standard-disabled"
      label="To"
      defaultValue="Montreal"
      margin="normal"
    />
    <TextField
      disabled
      id="date"
      label="Date"
      type="date"
      defaultValue="2020-08-02"
      margin="normal"
    />
    <Button
      variant="contained"
      color="primary"
      className="searchBox__button"
      onClick={() => props.clickSearch()}>
      Search
    </Button>
  </div>
);

export default SearchBox;
