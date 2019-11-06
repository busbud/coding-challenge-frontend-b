import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import { Departure } from '@data/schema/departure';

@Component({
  selector: 'app-search-result-departures',
  templateUrl: './search-result-departures.component.html',
  styleUrls: ['./search-result-departures.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class SearchResultDeparturesComponent implements OnInit {

  @Input() departures: Departure[];

  columnsToDisplay = ['departure_time', 'arrival_time', 'available_seats', 'operator_id', 'source_id'];

  expandedDeparture: Departure | null;

  constructor() { }

  ngOnInit() {
  }

}
