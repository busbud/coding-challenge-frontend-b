import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {ApiRequestService} from '../common/api-request/api-request.service';
import {map} from 'rxjs/operators';

@Injectable()
export class SearchService {
    apiUrl = 'https://napi.busbud.com/x-departures/';
    searchResult:any;

    constructor(private api: ApiRequestService) {
    }

    fetch(url: string, req?: number | string) {
        if (req) {
            url += `/${req}`;
        }
        const params = new HttpParams();
        return this.api.get(url, {headers: this.api.createHeaders(), params: params}).pipe(
            map((res: any) => res)
        );
    }

    storeSearchResult(data) {
        this.searchResult = data;
    }

    getSearchResult() {
        return this.searchResult;
    }

}



