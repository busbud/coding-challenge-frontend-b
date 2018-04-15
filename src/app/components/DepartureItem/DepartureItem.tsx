import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { SearchStore } from '../../store/search';
import { Departures } from '../../helpers/types/departures';
import { Locations } from '../../helpers/types/locations';
import { Operators } from '../../helpers/types/operators';
import { DepartureListItem, OperatorLogo, DepartureTimes, DeparturePrices, Button } from '../styledComponents';
import { Bus } from '../BusSvg';

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
                <p>
                  <b>{departure.departure_time}</b>
                  <br />
                  {getLocationById(
                        results.locations,
                        departure.origin_location_id
                    ).name}
                </p>

                <div>
                    <h4>{departure.duration}</h4>
                    <Bus />
                    <h4>{departure.has_transfers || 'Non Stop'}</h4>
                </div>
                <p>
                    <b>{departure.arrival_time} </b>
                    <br />
                    {getLocationById(
                        results.locations,
                        departure.destination_location_id
                    ).name}
                </p>
            </DepartureTimes>
            <DeparturePrices>
                <Button>${departure.totalPrice}</Button>
            </DeparturePrices>
        </DepartureListItem>
        )
    }
}


export default DepartureItem as React.ComponentClass<Props>;