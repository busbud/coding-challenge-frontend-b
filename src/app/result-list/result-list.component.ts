import { Component, Input, OnInit } from '@angular/core';
import { Option } from '../shared/dropdown-selector/dropdown-selector.component';
import { Departure, Travel } from './../services/departure.service';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.scss']
})
export class ResultListComponent implements OnInit {
  @Input() travelInfo: Travel;
  sortingOptions: Option[] = [
    { label: 'Cheapest', value: 'money' },
    { label: 'Fastest', value: 'time' },
    { label: 'Earliest', value: 'departureAsc' },
    { label: 'Latest', value: 'departureDesc' },
  ]
  sorting: 'money'|'time'|'departureAsc'|'departureDesc' = 'money'

  private sorters = {
    money: (depA: Departure, depB: Departure) =>
      depA.price > depB.price ? 1 : depA.price === depB.price ? 0 : -1,
    time: (depA: Departure, depB: Departure) =>
      depA.duration > depB.duration ? 1 : depA.duration === depB.duration ? 0 : -1,
    departureAsc: (depA: Departure, depB: Departure) =>
      depA.departureTime > depB.departureTime ? 1 : depA.departureTime === depB.departureTime ? 0 : -1,
    departureDesc: (depA: Departure, depB: Departure) =>
      depA.departureTime > depB.departureTime ? -1 : depA.departureTime === depB.departureTime ? 0 : 1,
  }

  constructor() {}

  ngOnInit() {
  }

  sortedDepartures() {
    console.log("Sorting");
    const sorter = this.sorters[this.sorting] || this.sorters.money;

    return this.travelInfo.departures.sort(sorter);
  }

}
