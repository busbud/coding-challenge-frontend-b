import * as _ from 'lodash';
import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {HttpClient} from '@angular/common/http';

export interface ApiRequestOptions {
    headers?: {
        [header: string]: string | string[];
    },
    params?: {
        [param: string]: string | string[];
    },
    reportProgress?: boolean;
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text',
    withCredentials?: boolean;
}

@Injectable()
export class ApiRequestService {
    private jwt: string;
    private baseUrl: string = `https://napi.busbud.com/x-departures/`;

    constructor(private http: HttpClient) {}

    createHeaders(headers?) {
        const data = {
            'Content-Type': 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
            'version': 2
        };

        const merged = {};

        _.merge(merged, data);

        return new HttpHeaders(merged).set("X-Busbud-Token", "PARTNER_AHm3M6clSAOoyJg4KyCg7w");
    }

    createOptions(options?): ApiRequestOptions {
        const defaults = {
            responseType: 'json'
        };

        const merged = {};

        _.merge(merged, defaults, options);

        return merged;
    }

    get(url, options?) {
        if (!url) {
            url = this.baseUrl;
        }
        return this.http.get(`${url}`, options);
    }
}
