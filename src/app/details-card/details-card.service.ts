import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
// import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';

@Injectable()
export class DetailsCardService {

    constructor(private http: HttpClient) {}

    getData():Observable<any> {
        return this.http.get('https://napi.busbud.com/x-departures/:origin/:destination/:outbound_date').map(res => {
            return JSON.parse(res['_body']);
    })
    }
}