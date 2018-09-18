import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
// import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';

@Injectable()
export class HomeService {

    constructor(private http: HttpClient) {}

    getData(today:any):Observable<any> {
        return this.http.get('https://napi.busbud.com/x-departures/dr5reg/f25dvk/'+today).map(res => {
            console.log(res);
            return JSON.parse(res['_body']);
    })
    }
}
