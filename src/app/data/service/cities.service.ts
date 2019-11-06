import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { City } from '../schema/city';
import { JsonApiService } from './json-api.service';

@Injectable({
    providedIn: 'root'
})
export class CitiesService {
    constructor (private jsonApiService: JsonApiService) {}

    getDepartureCities(): Observable<City[]> {
        return this.jsonApiService.get('/city/departures');
    }

    getArrivalCities(): Observable<City[]> {
        return this.jsonApiService.get('/city/arrivals');
    }

}