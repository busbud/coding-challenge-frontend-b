import {
    INIT_DEPARTURE_DATA,
    LOAD_DEPARTURE_DATA,
    LOAD_DEPARTURE_COMPLETED,
    updateDepartures
} from '../actions'

import Busbud from '../services/busbud'
import { Observable } from 'rxjs';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/takeUntil';

export const departureEpic = ( action$ ) => {
    

    return action$.ofType(INIT_DEPARTURE_DATA)
    .mergeMap( action => {
    
        return Observable
        .interval(1000)
        .switchMap( (x) => {
           
            const busbud = new Busbud()
            
            const busBudPromise = busbud.getDepartures(action.payload.originHash,action.payload.destinationHash,action.payload.outboundDate)

            return Observable
            .fromPromise(busBudPromise)
            .map(response => {
                return updateDepartures(response.data)
            })
           
        })
    })
    .takeUntil(action$.ofType(LOAD_DEPARTURE_COMPLETED))
}
    
    

