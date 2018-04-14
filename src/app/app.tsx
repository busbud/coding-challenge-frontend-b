import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { SearchStore } from './store/search';
import { SearchResponse } from './helpers/api';
import { Root, Header, HeaderH1, Button, Image, Footer, DepartureListItem, CitiesListItem, Ul, Container } from './components/components';
import { Locations } from './helpers/types/locations';
import { Operators } from './helpers/types/operators';

interface Props {
    store: SearchStore;
}

const formatBackgroundImage = (imageUrl: string, width: string, height: string): string => {
    let url = imageUrl.replace(/{width}/, width);
    url.replace(/{width}/, width)
    url.replace(/{height}/, height)
    console.log(url);
    return url;
} 

const getLocationById = (locations: Locations[], departureId: number) => {
    return locations.filter(({ id }) => id === departureId);
}

const getOperatorById = (oporators: Operators[], operatorId: string) => {
    return oporators.filter(({ id }) => id === operatorId);
}

@inject('store')
@observer
class App extends React.Component<Props> {
    render() {
        const { search, results, isComplete } = this.props.store;


        return (
            <Root>
                <Header>
                    <HeaderH1>Its Time to book for</HeaderH1>
                    <Image src={'osheaga.png'} />
                </Header>
                <Header>
                    <Button onClick={() => search()}>Lets Go!</Button>
                </Header>

                {results && (
                    <Container>
                        <Ul>
                            {results.cities.map(city => 
                                <CitiesListItem 
                                    key={city.id}
                                    backgroundImg={formatBackgroundImage(city.image_url, "400", "400")}
                                >
                                    <h3>{city.full_name}</h3>
                                </CitiesListItem>
                            )}
                        </Ul>
                        <h3>{`isLoaded: ${isComplete}`}</h3>
                        <Ul>
                            {results.departures.map(departure => 
                                <DepartureListItem key={departure.id}>
                                    <div>
                                        <Image src={getOperatorById(results.operators, departure.operator_id)[0].logo_url} />
                                    </div>
                                    <div>
                                        <span>
                                            <b>{departure.departure_time}: </b>
                                            {getLocationById(
                                                results.locations,
                                                departure.origin_location_id
                                            )[0].name}
                                        </span>
                                        <h2>{departure.duration}</h2>
                                        <span>
                                            <b>{departure.arrival_time}: </b> 
                                            {getLocationById(
                                                results.locations,
                                                departure.destination_location_id
                                            )[0].name}
                                        </span>
                                    </div>
                                    <div>
                                        <span>Price: ${departure.totalPrice}</span>
                                    </div>
                                </DepartureListItem>
                            )}
                        </Ul>
                    </Container>
                )}
                <Footer />
            </Root>
        );
    }
}


export default App as React.ComponentClass<{}>;