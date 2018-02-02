import React, { Component } from 'react';
import Results from './Results.js';

class Form extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            from: '',
            to: '',
            date: '2018-08-02',
            adults: 1,
            results: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        return fetch('https://napi.busbud.com/x-departures/' + this.state.from + '/' + this.state.to + '/' + this.state.date, {
            method: 'GET',
            headers: new Headers({
                Accept: 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
                'X-Busbud-Token': 'PARTNER_JSWsVZQcS_KzxNRzGtIt1A'
            })
        })
        .then(response => response.json())
        .then(json => {
            this.setState({ results: json });
        });
    }

    render() {
        const mtlGeo = 'f25dvk';
        const nycGeo = 'dr5reg';

        const {from, to, date, adults} = this.state;
        const isEnabled = from.length > 0 && to.length > 0 && date.length > 0 && adults > 0;

        return (
            <div>
                <form className="search_form" onSubmit={ this.handleSubmit }>
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
                    <input type="submit" disabled={!isEnabled} value="Search" />
                </form>
                <Results />
            </div>
        );
    }
}

export default Form;