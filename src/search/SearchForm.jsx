import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import CityPicker from '../components/CityPicker';
import './SearchForm.scss';

class SearchForm extends React.Component {
    static propTypes = {
        cities: PropTypes.array.isRequired,
        isSearching: PropTypes.bool.isRequired,
        onSubmit: PropTypes.func.isRequired,
    };

    state = {
        origin: '',
        destination: '',
        departureDate: new Date(2019, 7, 2).toISOString().substr(0, 10),
    };

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = () => {
        this.props.onSubmit(this.state.origin, this.state.destination, this.state.departureDate);
    };

    render() {
        return (
            <div className='search-form'>
                <Grid container spacing={24}>
                    <Grid item xs={12} sm={6}>
                        <FormControl margin="normal" fullWidth>
                            <InputLabel>Origin City</InputLabel>
                            <CityPicker 
                                cities={this.props.cities} 
                                value={this.state.origin}
                                onChange={this.handleChange}
                                name='origin' />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl margin="normal" fullWidth>
                            <InputLabel>Destination City</InputLabel>
                            <CityPicker 
                                cities={this.props.cities} 
                                value={this.state.destination}
                                onChange={this.handleChange}
                                name='destination' />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl margin="normal" fullWidth>
                            <InputLabel>Departure Date</InputLabel>
                            <TextField
                                disabled
                                name="date"
                                type="date"
                                value={this.state.departureDate}
                                InputLabelProps={{
                                    shrink: true,
                                }} />
                        </FormControl>
                    </Grid>

                    <div className='actions'>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            disabled={this.props.isSearching || !(this.state.origin && this.state.destination)}
                            onClick={this.handleSubmit}>
                            Search
                        </Button>
                    </div>
                </Grid>
            </div>
        );
    }
}

export default SearchForm;
