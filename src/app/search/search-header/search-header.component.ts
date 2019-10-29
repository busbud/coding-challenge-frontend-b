import * as _ from 'lodash';
import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-search-header',
  templateUrl: './search-header.component.html',
  styleUrls: ['./search-header.component.less']
})
export class SearchHeaderComponent implements OnInit {
  constructor(private translate: TranslateService) {}

  ngOnInit() {
  }

}
