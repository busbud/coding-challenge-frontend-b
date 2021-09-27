import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, timer } from 'rxjs';
import { catchError, map, switchMapTo, tap } from 'rxjs/operators';

export type TripSearch = {
  origin: string;
  destination: string;
  outboundDate: string;
  adult: number;
  child: number;
  senior: number;
  currency: string;
  lang: string;
}

export type Departure = {
  arrivalTime: string;
  departureTime: string;
  originId: number;
  destinationId: number;
  duration: number;
  operatorId: string;
  price: number;
  currency: string;
  id: string;
}

export type Travel = {
  origin: string;
  destination: string;
  locations: { id: number, name: string }[];
  operators: { id: string, name: string, logoUrl: string }[];
  departures: Departure[];
  complete: boolean;
  error?: boolean;
  errorMessage?: string;
}

@Injectable({
  providedIn: 'root'
})
export class DepartureService {
  private url = 'https://napi.busbud.com/x-departures';
  private token = 'PARTNER_c9g6z7V0SNqUlnar2EFsxw';
  private tripSearch: TripSearch = {} as any;
  private travelInfo: Travel;
  private travelSubject$: BehaviorSubject<Travel>;
  private pollDelay = 2000;

  constructor(
    private httpClient: HttpClient
  ) { }

  getDepartures(tripSearch: TripSearch): Observable<Travel> {
    this.travelInfo = undefined as any;
    this.tripSearch = tripSearch;
    this.travelSubject$ = new BehaviorSubject(this.generateEmptyResult());
    
    this.requestData().subscribe();

    return this.travelSubject$.asObservable();
  }

  private incrementTravelInfo(info: Travel) {
    if (!this.travelInfo) {
      this.travelInfo = info;

    } else {
      info.locations
        ?.filter(loc => !this.travelInfo.locations.find(({ id }) => id === loc.id))
        .forEach(loc => this.travelInfo.locations.push(loc));

      info.operators
        ?.filter(op => !this.travelInfo.operators.find(({ id }) => id === op.id))
        .forEach(op => this.travelInfo.operators.push(op));

      info.departures
        ?.filter(dep => !this.travelInfo.departures.find(({ id }) => id === dep.id))
        .forEach(dep => this.travelInfo.departures.push(dep));

      this.travelInfo.complete = info.complete;
      this.travelInfo.error = info.error;
    }
    
    this.travelSubject$.next(this.travelInfo);
  }

  private pollIfNeeded({ complete }: Travel) {
    if (!complete) {
      timer(this.pollDelay).pipe(
        switchMapTo(this.requestData())
      ).subscribe();
    }
  }

  private requestData(): Observable<Travel> {
    return this.generateRequest().pipe(
      map(data => this.parseResponse(data)),
      catchError(error => of(this.generateEmptyResult(error))),
      tap(info => this.pollIfNeeded(info)),
      tap(info => this.incrementTravelInfo(info))
    );
  }

  private composeUrl({ origin, destination, outboundDate }: TripSearch, index: number) {
    return `${ this.url }/${ origin }/${ destination }/${ outboundDate }${ index > 0 ? '/poll' : '' }`;
  }

  private generateRequest(): Observable<any> {
    const { adult, senior, child, lang, currency } = this.tripSearch;
    const index = this.travelInfo?.departures.length || 0;

    const headers = new HttpHeaders({
      'Accept': 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
      'X-Busbud-Token': this.token
    })

    const params = new HttpParams({ fromObject: {
      adult, senior, child, lang, currency,
      ...(index > 0 ? { index } : {})
    } })

    return this.httpClient.get(this.composeUrl(this.tripSearch, index), { headers, params })
  }

  private parseResponse({ cities, departures, locations, operators, complete }: any): Travel {
    return {
      origin: cities && cities[0].name,
      destination: cities && cities[1].name,
      locations: locations.map(({ id, name }: any) => ({ id, name })),
      operators: operators.map(({ id, name, logo_url }: any) => ({ id, name, logoUrl: logo_url })),
      departures:  departures.map((departure: any) => ({
          arrivalTime: departure.arrival_time, 
          departureTime: departure.departure_time, 
          originId: departure.origin_location_id,
          destinationId: departure.destination_location_id, 
          duration: departure.duration, 
          operatorId: departure.operator_id,
          id: departure.id,
          price: departure.prices.total,
          currency: departure.prices.currency
        })),
      complete
    }
  }

  private generateEmptyResult(error?: any): Travel {
    return {
      origin: this.tripSearch.origin,
      destination: this.tripSearch.destination,
      locations: [],
      operators: [],
      departures: [],
      complete: error !== undefined,
      error: !!error      
    }
  }
}
