import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class HomeService {

    constructor(private http: HttpClient) {}

    getData():Observable<any> {
        return this.http.get('https://napi.busbud.com/x-departures/dr5reg/f25dvk/2018-09-28', {headers: new HttpHeaders({'Accept': 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/', 'X-Busbud-Token':'PARTNER_AHm3M6clSAOoyJg4KyCg7w' })})
        .map(res => {
            return res;
    })
    }
}
