import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import cities from './json/cities.json';

@Injectable({
    providedIn: 'root'
})
export class JsonApiService {

    get(url: string): Observable<any> {
        switch (url) {
            case '/city/departures':
                return of(cities.departures);
            case '/city/arrivals':
                return of(cities.arrivals);
            default:
                return of([]);
        }
    }
}