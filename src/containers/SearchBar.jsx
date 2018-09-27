import React from 'react';
import Input from '@material-ui/core/Input';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
//Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchData } from '../actions/index';

const ORIGIN = 'dr5reg';
const DESTINATION = 'f25dvkL';
const DATE = '2019-09-02'

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    input: {
        margin: theme.spacing.unit,
    },
});

class SearchBar extends React.Component {

    state = {
        origin: '',
        destination: '',
        departure: '2019-09-02',
        return: '',
        passangers: ''
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSearch(event) {
        event.prevent.default();
        // here fetch data
    }

    componentWillMount() {
        fetchData(ORIGIN, DESTINATION, DATE)
    }
    render() {
        console.log('this.props', this.props)
        const { classes } = this.props;
        return <form className={classes.container}>
            <TextField
                label="Leaving from"
                className={classes.input}
                value={this.state.origin}
                name="origin"
                inputProps={{
                    'aria-label': 'Origin'
                }}
                onChange={(event) => this.handleChange(event)}
            />
            <TextField
                label="Going to"
                value={this.state.destination}
                className={classes.input}
                name="destination"
                inputProps={{
                    'aria-label': 'Destination',
                }}
                onChange={(event) => this.handleChange(event)}
            />
            <TextField
                label="Leaving on"
                value={this.state.departure}
                name="departure"
                className={classes.textField}
                InputLabelProps={{
                    'aria-label': 'Departure'
                }}
            />
            <TextField
                label="Number of Passangers"
                value={this.state.passangers}
                className={classes.input}
                name="passangers"
                inputProps={{
                    'aria-label': 'Number of Passangers',
                }}
                onChange={(event) => this.handleChange(event)}
            />
        </form>
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchData }, dispatch)
}

// export default withStyles(styles)(SearchBar);
export default connect(null, mapDispatchToProps)(withStyles(styles)(SearchBar))
