import * as _ from 'lodash';
import { Component, OnInit, Input} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.less']
})
export class SearchResultComponent implements OnInit {
    @Input() journeyDetailData:any;
    constructor(private translate: TranslateService) {}
    ngOnInit() {}

}
