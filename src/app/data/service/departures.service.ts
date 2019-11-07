import {
    HttpClient,
    HttpHeaders,
    HttpParams
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Departure } from '@data/schema/departure';
import { SearchResult } from '@data/schema/search-result';
import { environment } from '@env';
import { Store } from '@ngrx/store';
import {
    Observable,
    throwError,
    timer
} from 'rxjs';
import {
    concatMap,
    filter,
    map,
    take,
    tap
} from 'rxjs/operators';
import { SearchFormQuery } from '../../module/search/page/search-form/models/search-form-query.interface';
import * as _ from 'lodash';
import * as fromSearch from '../../module/search/state-management/reducers';
import {
    DeparturesApiActions
} from '../../module/search/state-management/actions';

@Injectable({
    providedIn: 'root',
})
export class DeparturesService {
    readonly headers: HttpHeaders;

    constructor(
        private http: HttpClient,
        private store: Store<fromSearch.State>
    ) {
        this.headers = new HttpHeaders(
            {
                [environment.api.apiHeaderName]: environment.api.apiToken,
                'Content-Type': 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/'
            }
        );
    }

    searchDepartures(data: SearchFormQuery): Observable<Departure[]> {
        const [outboundDate] = data.outboundDate.split('T');

        const apiUrl = `${environment.api.apiUrl}${data.departure.geohash}/${data.arrival.geohash}/${outboundDate}`;
        const apiUrlPoll = `${apiUrl}/poll`;

        let params = new HttpParams({
            fromObject: {
                adult: data.adults.toString()
            }
        });

        let heap: Partial<SearchResult> = {};

        const fetchDepartures = (): Observable<SearchResult> => {
            let url = apiUrl;

            if ('complete' in heap) {
                url = apiUrlPoll;
            }

            if (heap.departures) {
                if (params.has('index')) {
                    params = params.delete('index');
                }

                const index = heap.departures.length || 0;

                params = params.append('index', index.toString());
            }

            return this.http.get<SearchResult>(url, {
                headers: this.headers,
                params
            });
        };

        return timer(0, environment.api.pollingTimeout)
            .pipe(
                concatMap(fetchDepartures),
                tap(response => {
                    heap = _.merge(heap, response);

                    if (heap.departures && heap.departures.length && response.departures && response.departures.length) {
                        // TODO: area of improvement for performance
                        this.store.dispatch(DeparturesApiActions.partialUpdate({ departures: this.parseResponse(heap) }));
                    }
                })
            )
            .pipe(filter(response => response.complete === true))
            .pipe(
                take(1),
                map(
                    (response: SearchResult) => this.parseResponse(heap),
                    error => throwError(error)
                )
            );
    }

    private parseResponse(data: Partial<SearchResult>): Departure[] {
        // TODO: area of improvement for performance
        // we can memoize cities, locations, operators
        const cities = {};
        data.cities.forEach(city => {
            cities[city.id] = city;
        });

        const locations = {};
        data.locations.forEach(location => {
            locations[location.id] = location;
        });

        const operators = {};
        data.operators.forEach(operator => {
            operators[operator.id] = operator;
        });

        const departures: Departure[] = data.departures.map((departure): Departure => {
            const [departureDate, departureTime] = departure.departure_time.split('T');
            const [arrivalDate, arrivalTime] = departure.arrival_time.split('T');
            const normalizedDeparture = {
                ...departure,
                viewData: {
                    operator: _.clone(operators[departure.operator_id]),
                    destinationLocation: _.clone(locations[departure.destination_location_id]),
                    originLocation: _.clone(locations[departure.origin_location_id]),
                    price: (departure.prices.total / 100).toPrecision(4),
                    currency: departure.prices.currency,
                    departureDateTime: {
                        date: departureDate,
                        time: departureTime
                    },
                    arrivalDateTime: {
                        date: arrivalDate,
                        time: arrivalTime
                    },
                    amenitiesType: departure.amenities.display_name,
                    amenities: Object.entries(departure.amenities)
                        .map(item => (item[0] === 'display_name' || item[1] !== true) ? undefined : item[0])
                        .filter(Boolean),
                    operatorTerms: operators[departure.operator_id].terms
                                   ? Object.entries(operators[departure.operator_id].terms)
                                        .map((item: any[]) => [true, false].includes(item[1]) ? item[0] : item.join(': '))
                                   : []
                }
            };

            normalizedDeparture.viewData.destinationLocation.city =
                _.clone(cities[normalizedDeparture.viewData.destinationLocation.city_id]);
            normalizedDeparture.viewData.originLocation.city =
                _.clone(cities[normalizedDeparture.viewData.originLocation.city_id]);


            return normalizedDeparture;
        });

        return departures || [];
    }
}
