import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Departure } from '../models/departure.model';

const headers = new HttpHeaders({
  Accept: 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
  'X-Busbud-Token': 'PARTNER_AHm3M6clSAOoyJg4KyCg7w',
});

@Injectable({
  providedIn: 'root',
})
export class DepartureService {
  constructor(private http: HttpClient) {}

  getDepartures(): Observable<Departure[]> {
    return this.http
      .get<Departure[]>(`https://napi.busbud.com/x-departures/dr5reg/f25dvk/2019-08-02/`, {
        headers,
      })
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }
}
