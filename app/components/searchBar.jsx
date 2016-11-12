'use strict';
import React from 'react';

export default class SearchBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            textInput1: '',
            textInput2: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        this.props.onSubmit();
        event.preventDefault();
    }

    handleClick(event) {
        if (event == 1) {
            this.setState({textInput1: this.props.value1});
        }
        if (event == 2) {
            this.setState({textInput2: this.props.value2});
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-md-offset-3" style={{"textAlign":"center"}}>
                        <form className="form-inline" onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <input type="text" className="form-control" onClick={() => this.handleClick(1)} placeholder={this.props.placeHolder1} value={this.state.textInput1} readOnly></input>
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" onClick={() => this.handleClick(2)} placeholder={this.props.placeHolder2} value={this.state.textInput2} readOnly></input>
                            </div>
                            <input type="submit" value="Search" className="btn btn-default"></input>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
