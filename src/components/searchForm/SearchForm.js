import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import moment from 'moment';
import { delay } from '../../helpers/delay';
import { cleanStore, searchRequestSuccess } from '../../actions/search.actions';
import { URL_INIT_SEARCH, URL_POLL_SEARCH, HEARDERS } from '../../constants/applications';
import withI18n from '../../contexts/withI18n';

import './SearchForm.scss';

export class SearchForm extends Component {
    constructor() {
        super();
        this.state = {
            departure: "New York",
            arrival: "Montreal",
            date: "2019-08-02",
            passenger: "1 Adult",
            departures: []
        }
        this.handleSearch = this.handleSearch.bind(this);
    }

    async handleSearch() {
        this.props.cleanStore();
        try {
            const response = await fetch(URL_INIT_SEARCH, HEARDERS)
            if (response.status === 200) {
                await this.pollSearch(URL_POLL_SEARCH, HEARDERS);
            }
        } catch (err) {
            console.log('Init search failed');
        }
    }

    async pollSearch(url, HEADERS, index = 0) {
        try {
            url = (index !== 0) ? `${url}?index=${index}` : url;
            const response = await fetch(url, HEADERS);
            const data = await response.json();
            this.props.searchRequestSuccess(data)
            if (!data.complete) {
                delay(3000);
                this.pollSearch(url, HEADERS, data.departures.length);
            }

        } catch (err) {
            console.log('Poll search failed');
        }
    }

  

    render() {
        return (
            <div className="SearchForm">
                <TextField
                    label = { this.props.i18n._('departure')}
                    className="text-field"
                    value= { this.state.departure}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    label= {this.props.i18n._('destination')}
                    className="text-field"
                    value={this.state.arrival}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    label = {this.props.i18n._('date')}
                    className="text-field"
                    value={moment(this.state.date).format(this.props.i18n._('dateformat'))}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    label={this.props.i18n._('passenger')}
                    className="text-field"
                    value={this.state.passenger}
                    margin="normal"
                    variant="outlined"
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleSearch}
                >
                    Search
                </Button>
            </div>
        )
    }
}

const mapDispatchToProps = {
    cleanStore,
    searchRequestSuccess
}

export const searchForm = SearchForm;
export default connect(undefined, mapDispatchToProps)(withI18n(SearchForm));