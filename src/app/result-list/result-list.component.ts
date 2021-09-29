import { Component, Input } from '@angular/core';

import { Departure, Option, Travel } from '@app/shared/models';


@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.scss']
})
export class ResultListComponent {
  @Input() travelInfo: Travel | null;
  sorting: { value: 'price'|'duration'|'departureTime', reversed?: boolean } = { value: 'price' };
  sortingOptions: Option[] = [
    { value: 'price' },
    { value: 'duration' },
    { value: 'departureTime' },
    { value: 'departureTime', reversed: true }
  ].map((opt: any) => ({ ...opt, label: `result-list.orderby.${opt.value}${ opt.reversed ? 'Asc' : '' }`}) );

  sortedDepartures() {
    const key = this.sorting.value;
    const factor = this.sorting.reversed ? -1 : 1;
    return this.travelInfo?.departures.sort((depA: Departure, depB: Departure) =>
      depA[key] > depB[key] ? factor : depA[key] === depB[key] ? 0 : -1*factor);
  }

}
