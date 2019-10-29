import * as _ from 'lodash';
import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {SearchService} from './search.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less']
})
export class SearchComponent implements OnInit {
  journeyDetails:Array<any> = [];
  searchResponse:any;
  errorFlag = false;
  poller;
  constructor(private translate: TranslateService, 
    private router: Router, 
    private search: SearchService) {
      translate.setDefaultLang('en');
      translate.use('en');
    }
  
  ngOnInit() {
    //setting the default search
    let url = `${this.search.apiUrl}dr5reg/f25dvk/${this.getCurrentDate()}`;
    let queryParams = `adult=1`;
    this.getSearchResponse(url, queryParams);
  }


  getSearchResponse(url, queryParams) {
    this.search.fetch(`${url}?${queryParams}`).subscribe((res: any) => {
      this.searchResponse = res;
      if (res.complete) {
        localStorage.setItem("lastDepartureLength", res.departures.length);
        this.parseResponse(res);
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


  private parseResponse(res) {
    res.departures.forEach((item) => {
      let address = this.getAddressAndOperatorInfo(item['origin_location_id'], 
                                    item['destination_location_id'],
                                    item['operator_id']);
      let resultObj = { departureTime: this.retiveTime(item['departure_time']),
                        arrivalTime: this.retiveTime(item['arrival_time']),
                        price: item.prices.total,
                        seats: item['available_seats'],
                        currency: item.prices.currency
                      };
      resultObj = _.merge(resultObj, address);
      this.journeyDetails.push(resultObj);
    });
  }

  private getAddressAndOperatorInfo(origin, arrival, operatorId) {
    let originCity, arrivalCity;
    let originObj = this.searchResponse.locations.filter((location) => {
      return location.id === origin;
    }).pop();

    if (this.searchResponse.cities) {
      originCity = this.searchResponse.cities.filter((city) => {
        return city.id === originObj['city_id'];
      }).pop();
    }

    let arrivalObj = this.searchResponse.locations.filter((location) => {
      return location.id === arrival;
    }).pop();

    if (this.searchResponse.cities) {
      arrivalCity = this.searchResponse.cities.filter((city) => {
        return city.id === arrivalObj['city_id'];
      }).pop();
    }

    let OperatorInfo = this.searchResponse.operators.filter((operator) => {
      return operator.id === operatorId;
    }).pop();

    return {  
      originStation: originObj.name, 
      originAddress: (!_.isEmpty(originCity)) ? originCity.name : '',
      arrivalStation: arrivalObj.name, 
      arrivalAddress: (!_.isEmpty(arrivalCity)) ? arrivalCity.name : '',
      operatorUrl: OperatorInfo['logo_url']
    };
  }

  private retiveTime(dateString) {
    let dateObj = new Date(dateString);
    let minute = (dateObj.getMinutes() < 10) ? `0${dateObj.getMinutes()}` : dateObj.getMinutes();
    return `${dateObj.getHours()}:${minute}`;
  }

  private getCurrentDate() {
    var today = new Date();
    return `${today.getFullYear()}-${(today.getMonth()+1)}-${today.getDate()}`;
  }

  updateSearchResult(eventData) {
    this.journeyDetails = [];// to  display latest search result;
    let url = `${this.search.apiUrl}${eventData.origin}/${eventData.destination}/${eventData.traveldate}`;
    let queryParam = `adult=${eventData.passenger}`;
    this.getSearchResponse(url, queryParam);
  }

}
