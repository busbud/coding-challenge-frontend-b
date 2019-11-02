import {Injectable, EventEmitter} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {ApiRequestService} from '../common/api-request/api-request.service';
import {map} from 'rxjs/operators';
import * as _ from 'lodash';

@Injectable()
export class SearchService {
    updatedResults = new EventEmitter<any>();
    apiUrl = 'https://napi.busbud.com/x-departures/';
    searchResponse:any;

    constructor(private api: ApiRequestService) {
    }

    fetch(url: string, req?: number | string) {
        if (!url) {
            url = `${this.apiUrl}dr5reg/f25dvk/${this.getCurrentDate()}?adult=1`;
        }
        
        if (req) {
            url += `/${req}`;
        }
        const params = new HttpParams();
        return this.api.get(url, {headers: this.api.createHeaders(), params: params}).pipe(
            map((res: any) => this.searchResponse = res)
        );
    }
    
    defaultUrlAndParam() {
        return {
            url : `${this.apiUrl}dr5reg/f25dvk/${this.getCurrentDate()}`,
            queryParams: `adult=1`
        }
    }

    parseResponse(res) {
        let results = [];
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
            results.push(resultObj);
        });
        return results;
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
        let today = new Date();
        let day = (today.getDate() < 10) ? `0${today.getDate()}` : today.getDate();
        return `${today.getFullYear()}-${(today.getMonth()+1)}-${day}`;
    }

    updateSearchResult(params: any) {
        this.updatedResults.emit(params);
    }

}