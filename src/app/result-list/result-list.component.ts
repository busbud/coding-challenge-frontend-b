import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Travel } from './../services/departure.service';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.scss']
})
export class ResultListComponent implements OnChanges, OnInit {
  @Input() travelInfo: Travel;

  constructor() {}

  ngOnInit() {
    this.travelInfo = {
      origin: 'Quebec',
      destination: 'Montreal',
      locations: [],
      operators: [],
      departures:[],
      complete: true
    };
  }

  ngOnChanges(e: any): void {
    console.log(e, this.travelInfo);
  }

}
