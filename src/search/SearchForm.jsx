import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import CityPicker from '../components/CityPicker';

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
            <form>
                <FormControl margin="normal" fullWidth>
                    <InputLabel>Origin City</InputLabel>
                    <CityPicker 
                        cities={this.props.cities} 
                        value={this.state.origin}
                        onChange={this.handleChange}
                        name='origin' />
                </FormControl>

                <FormControl margin="normal" fullWidth>
                    <InputLabel>Destination City</InputLabel>
                    <CityPicker 
                        cities={this.props.cities} 
                        value={this.state.destination}
                        onChange={this.handleChange}
                        name='destination' />
                </FormControl>

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

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={this.props.isSearching || !(this.state.origin && this.state.destination)}
                    onClick={this.handleSubmit}>
                    Search
                </Button>
            </form>
        );
    }
}

export default SearchForm;
