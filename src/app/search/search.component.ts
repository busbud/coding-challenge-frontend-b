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
export class SearchComponent {
  constructor(private translate: TranslateService, 
    private router: Router, 
    private search: SearchService) {
      translate.setDefaultLang('en');
      translate.use('en');
    }

}