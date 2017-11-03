import {
    INIT_DEPARTURE_REQUEST,
    END_DEPARTURE_REQUESTS,
    handleDepartureResponses
} from '../actions'

import Busbud from '../services/busbud'
import { Observable } from 'rxjs';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/takeUntil';

export const departureEpic = ( action$ ) => {
    
    const busbud = new Busbud()

    return action$.ofType(INIT_DEPARTURE_REQUEST)
    .mergeMap( action => {
    
        return Observable
        .interval(1000)
        .switchMap( (x) => {
           
            const busBudPromise = busbud.getDepartures(action.payload.originHash,action.payload.destinationHash,action.payload.outboundDate)

            return Observable
            .fromPromise(busBudPromise)
            .map(response => {
                
                console.log(response.data)
                
                return handleDepartureResponses(response.data)
                   
            })
           
        })
    })
    .takeUntil(action$.ofType(END_DEPARTURE_REQUESTS))
}
    
    

