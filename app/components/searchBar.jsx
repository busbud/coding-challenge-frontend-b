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
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-md-offset-3">
                        <form className="form-inline" onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder={this.props.placeHolder1} value={this.state.textInput} readOnly></input>
                                <input type="text" className="form-control" placeholder={this.props.placeHolder2} value={this.state.textInput} readOnly></input>
                            </div>
                            <button type="submit" className="btn btn-primary">Search</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
