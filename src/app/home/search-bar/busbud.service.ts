import { Injectable } from '@angular/core';
import { HttpClientModule, HttpHeaders, HttpClient } from '@angular/common/http';
import { Subject, timer } from 'rxjs';
import { concatMap, filter, take } from 'rxjs/operators';
import * as _ from "lodash";

@Injectable({
  providedIn: 'root'
})

export class BusbudService {
  private resultsUpdated = new Subject<any>();
  departures: any;

  private _configUrl: string = 'https://napi.busbud.com/x-departures/';

  private httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
      'X-Busbud-Token': 'PARTNER_AHm3M6clSAOoyJg4KyCg7w'
    })
  }

  constructor(private http: HttpClient) {}

  // Fetch Results with default options
  fetchResults(
      origin: string = 'dr5reg',
      destination: string='f25dvk',
      dateAndTime: string= '2020-08-02',
      adult: string='1',
      child: string='0',
      senior: string='0',
      lang: string='EN',
      currency: string='USD',) {

    // build Url
    this._configUrl = this._configUrl + `${origin}/${destination}/${dateAndTime}/?${adult}/?${child}/?${senior}/?${lang}/?${currency}`;

    this.http.get(this._configUrl, this.httpOptions)
      .subscribe(initialResponse => {
        this.departures = [];
        const isComplete = initialResponse['complete'];

        // polling Url
        this._configUrl = this._configUrl + `/poll`;

        if (isComplete === false) {
          timer(0, 4000)
            .pipe(concatMap(() => this.http.get(this._configUrl, this.httpOptions)))
            .pipe(filter(data => data['complete'] === true))
            .pipe(take(1))
            .subscribe(pollResponse => {
              this.updateResults(pollResponse);
          });
        } else {
          this.updateResults(initialResponse);
        }
      });
  }

  updateResults(response: any) {
    const locations = response['locations'];
    const operators = response['operators'];
    const departures = response['departures'];
    console.log(operators);
    departures.forEach((resultItem: { [x: string]: any; }) => {
        let price = resultItem['prices']['total'];
        price = ((price * 1.0) / 100).toFixed(1);

        let arrival = resultItem['arrival_time'];
        arrival = arrival.substring(11, 16);

        let departure = resultItem['departure_time'];
        departure = departure.substring(11, 16);

        let origin = locations.find((elem: { [x: string]: any; }) => elem['id'] === resultItem['origin_location_id']);
        origin = origin['name'];

        let amenities = _.map(resultItem.amenities, (k: any,v: any) => {
          if(k !== null) return v;
        });

        let operator = _.filter(operators,(op: any) => { return op.id === resultItem.operator_id } );

        let refund = resultItem['terms'].refund_policies[0].type;


        const item = {
          departureTime: departure,
          arrivalTime: arrival,
          locationName: origin,
          price: price,
          amenities: amenities,
          operator: operator[0],
          refund: refund,
        };
        this.departures.push(item);
      });
      console.log(this.departures);
      this.resultsUpdated.next([...this.departures]);
  }

  getDepartureUpdateListener() {
    return this.resultsUpdated.asObservable();
  }
}
