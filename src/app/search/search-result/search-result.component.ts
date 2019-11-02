import * as _ from 'lodash';
import { Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {SearchService} from '../search.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.less']
})
export class SearchResultComponent implements OnInit {
  journeyDetails = [];
  searchResponse:any;
  errorFlag = false;
  poller;
  constructor(private translate: TranslateService,
    private search: SearchService) {}
  ngOnInit() {
    //setting the default search
    let locationObj = this.search.defaultUrlAndParam();
    this.getSearchResponse(locationObj.url, locationObj.queryParams);
    this.updateSearchResult();
  }
  
  getSearchResponse(url, queryParams) {
    this.search.fetch(`${url}?${queryParams}`).subscribe((res: any) => {
      this.searchResponse = res;
      if (res.complete) {
        localStorage.setItem("lastDepartureLength", res.departures.length);
        this.journeyDetails = this.search.parseResponse(res);
        clearInterval(this.poller);
        // Below condition added to address edge condition when complete return true but no response
        if (!res.departures.length) {
          let upadteUrl = (url.indexOf('poll') > -1) ? url.replace('/poll', '') : url;
          this.getSearchResponse(upadteUrl, queryParams);
        }
      } else {
        let length = localStorage.getItem("lastDepartureLength");
        let pollUrl = (url.indexOf('poll?') > -1) ? url : `${url}/poll`;
        let queryParamPoller = (queryParams.indexOf('index=') > -1) ? queryParams : `${queryParams}&index=${length}`;
        this.poller = setInterval(() => this.getSearchResponse(pollUrl, queryParamPoller), 5000);
      }
    }, () => {
      this.errorFlag = true;
    });
  }

  updateSearchResult() {
    this.search.updatedResults
    .subscribe(
      (eventData: any) => {
        let url = `${this.search.apiUrl}${eventData.origin}/${eventData.destination}/${eventData.traveldate}`;
        let queryParam = `adult=${eventData.passenger}`;
        this.journeyDetails = [];
        this.getSearchResponse(url, queryParam);
      }
    );
  }
}
