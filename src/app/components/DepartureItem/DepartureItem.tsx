import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { SearchStore } from '../../store/search';
import { Departures } from '../../helpers/types/departures';
import { Locations } from '../../helpers/types/locations';
import { Operators } from '../../helpers/types/operators';
import { Bus } from '../BusSvg';
import { 
    DepartureListItem, 
    OperatorLogo, 
    DepartureTimes, 
    DeparturePrices, 
    PlusDays, 
    Times, 
    Location, 
    Duration
} from './StyledComponents';

interface Props {
  departure: Departures;
}
  
interface MobxProps extends Props {
    store: SearchStore;
}

const getLocationById = (locations: Locations[], departureId: number): Locations => 
    locations.filter(({ id }) => id === departureId)[0];

const getOperatorById = (oporators: Operators[], operatorId: string): Operators => 
    oporators.filter(({ id }) => id === operatorId)[0];

@inject('store')
@observer
class DepartureItem extends React.Component<MobxProps> {
    render() {
        const { store, departure } = this.props;
        const { results } = store;
        
        return results && (
          <DepartureListItem>
            <OperatorLogo 
                backgroundImg={
                    getOperatorById(results.operators, departure.operator_id).logo_url
                }
            />
            <DepartureTimes>
                <Times>
                    <b>{departure.departure_time}</b>
                    <br />
                    <Location>
                        {getLocationById(
                            results.locations,
                            departure.origin_location_id
                        ).name}
                    </Location>
                </Times>
                <Duration>
                    <h4>{departure.duration}</h4>
                    <Bus />
                    <h4>{departure.has_transfers || 'Non Stop'}</h4>
                </Duration>
                <Times>
                    <b>
                        {departure.arrival_time}
                        {!(departure.daysDifference > 0) 
                            ? null
                            : <PlusDays>+{departure.daysDifference}</PlusDays>
                        }
                    </b>
                    <br />
                    <Location>
                        {getLocationById(
                            results.locations,
                            departure.destination_location_id
                        ).name}
                    </Location>
                </Times>
            </DepartureTimes>
            <DeparturePrices>
                ${departure.totalPrice}
            </DeparturePrices>
        </DepartureListItem>
        )
    }
}


export default DepartureItem as React.ComponentClass<Props>;