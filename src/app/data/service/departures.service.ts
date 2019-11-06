import {
    HttpClient,
    HttpHeaders,
    HttpParams
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Departure } from '@data/schema/departure';
import { SearchResult } from '@data/schema/search-result';
import { environment } from '@env';
import {
    from,
    Observable,
    of,
    throwError,
    timer
} from 'rxjs';
import {
    filter,
    map,
    switchMap,
    takeWhile
} from 'rxjs/operators';
import { SearchFormQuery } from '../../module/search/page/search-form/models/search-form-query.interface';
import * as _ from 'lodash';

@Injectable({
    providedIn: 'root',
})
export class DeparturesService {
    private headers: HttpHeaders;

    constructor(private http: HttpClient) {
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

        const params = new HttpParams({
            fromObject: {
                adult: data.adults.toString(),
                child: data.children.toString(),
                senior: data.seniors.toString()
            }
        });

        // TODO: implement polling
        return this.http.get<SearchResult>(apiUrl, {
            headers: this.headers,
            params
        })
            .pipe(map(
                (response: SearchResult) => this.parseResponse(response),
                error => throwError(error)
            )
        );
    }

    private parseResponse(data: SearchResult): Departure[] {
        console.log(data);
        return data.departures || [];
    }
}
