import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
//Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchData, fetchFinish } from '../actions/index';

const ORIGIN = 'dr5reg';
const DESTINATION = 'f25dvk';
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

const geoMapping = [
    { geotag: 'dr5reg', name: "New York" },
    { geotag: 'f25dvk', name: "Montreal" }
]

class SearchBar extends React.Component {

    state = {
        origin: 'New York',
        originGeotag: { geotag: ORIGIN },
        destination: 'Montreal',
        destinationGeotag: { geotag: DESTINATION },
        departure: DATE,
        return: '',
        passangers: ''
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
        this.setState({ [event.target.name + 'Geotag']: geoMapping.find(tag => tag.name === event.target.value) })
    }

    handleSearch(event) {
        event.prevent.default();
    }

    handleClick(origin, destination, departure) {
        if (origin && destination && departure) {
            this.props.fetchData(origin, destination, departure);
        }
    }
    render() {
        const { classes } = this.props;
        return <form className={classes.container}>
            <Grid container
                alignItems="center"
                spacing={8}>
                <Grid item xs={6} sm={3}>
                    <TextField
                        label="Leaving from"
                        className={classes.input}
                        value={this.state.origin}
                        name="origin"
                        inputProps={{
                            'aria-label': 'Origin'
                        }}
                        onChange={(event) => this.handleChange(event)} />
                </Grid>
                <Grid item xs={6} sm={3}>
                    <TextField
                        label="Going to"
                        value={this.state.destination}
                        className={classes.input}
                        name="destination"
                        inputProps={{
                            'aria-label': 'Destination',
                        }}
                        onChange={(event) => this.handleChange(event)} />
                </Grid>
                <Grid item xs={6} sm={3}>
                    <TextField
                        label="Leaving on"
                        value={this.state.departure}
                        name="departure"
                        className={classes.input}
                        InputLabelProps={{
                            'aria-label': 'Departure'
                        }} />
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        className={classes.button}
                        fullWidth
                        onClick={() => this.handleClick(
                            this.state.originGeotag.geotag,
                            this.state.destinationGeotag.geotag,
                            this.state.departure
                        )}>
                        Search
                    </Button>
                </Grid>
            </Grid>
        </form >

    }
}
function mapStateToProps(state) {
    return {
        ...state
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchData, fetchFinish }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SearchBar))


