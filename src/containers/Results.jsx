import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ContainerTimePrice from '../components/ContainerTimePrice';
import ContainerLocations from '../components/ContainerLocations';
import ContainerDetails from '../components/ContainerDetails';
//Redux
import { connect } from 'react-redux';

const styles = {
    card: {
        maxWidth: 720,
        marginBottom: 20,
        padding: 10
    },
    arrow: {
        verticalAlign: 'middle',
    },
    price: {
        float: 'right'
    },
    button: {
        backgroundColor: '#f19020',
        float: 'right',
        maxWidth: '100%'
    },
    media: {
        height: 140,
    },
    icon: {
        veticalAlign: 'inherit'
    }
};
class Results extends React.Component {

    render() {
        const { classes } = this.props;
        // const data = this.props.results.payload ? this.props.results.payload : this.props.results;
        const data = this.props.results.payload || this.props.results;

        if (data.length === 0) {
            return <div><p>Search for a bus route.</p>
                <p>For the purpose of this exercice input <em>New York</em> as origin and <em>Montreal</em> as destination. </p></div>
        }
        else {
            return (
                <div>
                    {
                        data.departures.map(dep => {
                            const departureTime = new Date(dep.departure_time);
                            const arrivalTime = new Date(dep.arrival_time);
                            const departureHours = departureTime.getHours() < 10 ? '0' + departureTime.getHours() : departureTime.getHours();
                            const departureMinutes = departureTime.getMinutes() < 10 ? '0' + departureTime.getMinutes() : departureTime.getMinutes();
                            const arrivalHours = arrivalTime.getHours() < 10 ? '0' + arrivalTime.getHours() : arrivalTime.getHours();
                            const arrivalMinutes = arrivalTime.getMinutes() < 10 ? '0' + arrivalTime.getMinutes() : arrivalTime.getMinutes();
                            const originLocation = data.locations.filter(loc =>
                                loc.id === dep.origin_location_id);
                            const destinationLocation = data.locations.filter(loc =>
                                loc.id === dep.destination_location_id);
                            const originCity = data.cities.filter(city => city.id === data.origin_city_id);
                            const destinationCity = data.cities.filter(city => city.id === data.destination_city_id);

                            return (
                                <Card key={dep.id}
                                    className={classes.card}>
                                    <CardContent>
                                        <ContainerTimePrice
                                            departureHours={departureHours}
                                            departureMinutes={departureMinutes}
                                            arrivalHours={arrivalHours}
                                            arrivalMinutes={arrivalMinutes}
                                            dep={dep}
                                            {...this.props} />
                                        <ContainerLocations
                                            originCity={originCity}
                                            originLocation={originLocation}
                                            destinationCity={destinationCity}
                                            destinationLocation={destinationLocation}
                                            {...this.props} />
                                        <ContainerDetails
                                            departure={dep}
                                            data={data} />
                                    </CardContent>
                                </Card>
                            )
                        })
                    }
                </div>
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        ...state
    };
}

export default connect(mapStateToProps)(withStyles(styles)(Results))


