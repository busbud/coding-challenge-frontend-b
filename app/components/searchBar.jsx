'use strict';
import React from 'react';

export default class SearchBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            textInput: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
      alert('A name was submitted: ' + this.state.value);
      event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div class="form-group">
                  <input type="text" class="form-control" placeholder="{this.props.placeHolder}" value={this.state.textInput} readonly></input>
                </div>
                <button type="submit" class="btn btn-primary">Search</button>
            </form>
        );
    }
}
