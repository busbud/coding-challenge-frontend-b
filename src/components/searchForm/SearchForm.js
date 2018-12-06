import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { wait } from '../../helpers/wait';
import { cleanStore, searchRequestSuccess } from '../../actions/search.actions';
import { URL_INIT_SEARCH, URL_POLL_SEARCH, HEARDERS } from '../../constants/applications';
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
            if(response.status === 200) {
                await this.fetchWithIndex(URL_POLL_SEARCH, 10);
            }
        } catch (err) {
            console.log('Init search failed');
        }
    }
    
    async fetchWithIndex(url, index){
        try {
            // const WITH_INDEX = `${url}${index}`;
            index += 10;
            const response = await fetch(url, HEARDERS);
            const data = await response.json();
            this.props.searchRequestSuccess(data)
    
            if(!data.complete){
                await wait(3000);
                fetchWithIndex(URL_POLL_SEARCH, index);
            }
    
        } catch (err) {
            console.log('Poll search failed');
        }
    }

    render() {
        return (
            <div className="SearchForm">
                <TextField
                    label="Leaving from"
                    className="text-field"
                    value={this.state.departure}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    label="Going to"
                    className="text-field"
                    value={this.state.arrival}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    label="Date"
                    className="text-field"
                    value={this.state.date}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    label="passenger"
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

export default connect(undefined, mapDispatchToProps)(SearchForm);