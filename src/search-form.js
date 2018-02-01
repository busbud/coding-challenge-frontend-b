import React, { Component } from 'react';



class SearchForm extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            from: '',
            to: '',
            date: '2018-08-02',
            adults: 1
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    render() {
        const mtlGeo = 'f25dvk';
        const nycGeo = 'dr5reg';

        return (
            <form className="search_form">
                <label>
                    From
                    <select name="from" value={ this.state.value } onChange={ this.handleChange }>
                        <option value="">Select an option</option>
                        <option value={ nycGeo }>New York City</option>
                    </select>
                </label>
                <label>
                    To
                    <select name="to" value={ this.state.value } onChange={ this.handleChange }>
                        <option value="">Select an option</option>
                        <option value={ mtlGeo }>Montreal</option>
                    </select>
                </label>
                <label>
                    Date
                    <input type="text" name="date" value={ this.state.date } onChange={ this.handleChange } />
                </label>
                <label>
                    # of adults
                    <input type="number" name="adults" min="1" value={ this.state.adults } onChange={ this.handleChange } />
                </label>
            </form>
        );
    }
}

export default SearchForm;