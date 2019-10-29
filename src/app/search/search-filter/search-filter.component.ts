import * as _ from 'lodash';
import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.less']
})
export class SearchFilterComponent implements OnInit {
    @ViewChild('f', { static: false }) searchForm: NgForm;
    @Output() resultObj:any = new EventEmitter<any>();
    journeyDetails:Array<any> = [];
    passengerNumber = 1;
    constructor(private translate: TranslateService) {}
    
    ngOnInit() {}
    getSearchResult() {
        let source = (this.searchForm.value.source) ? this.searchForm.value.source : 'dr5reg';
        let destination = (this.searchForm.value.destination) ? this.searchForm.value.destination : 'f25dvk';
        let traveldate = (!_.isEmpty(this.searchForm.value.travelDate)) ? this.formatDate(this.searchForm.value.travelDate) : this.getCurrentDate();
        let passenger = (this.searchForm.value.passenger) ? this.searchForm.value.passenger : '1';
        this.resultObj.emit({origin: source, 
                            destination: destination,
                            traveldate: traveldate,
                            passenger: passenger});
    }

    private getCurrentDate() {
        let today = new Date();
        return `${today.getFullYear()}-${(today.getMonth()+1)}-${today.getDate()}`;
    }

    private formatDate(date) {
        let month = (date.month < 10) ? `0${date.month}` : date.month;
        let day = (date.day < 10) ? `0${date.day}` : date.day;
        return `${date.year}-${month}-${day}`;
    }

}
