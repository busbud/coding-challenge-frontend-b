import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Departure } from '@data/schema/departure';
import * as _ from 'lodash';
import {
  Observable,
  of,
  Subject
} from 'rxjs';
import {
  startWith,
  switchMap,
  takeUntil
} from 'rxjs/operators';

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
export class SearchResultDeparturesComponent implements OnChanges, AfterViewInit, OnDestroy {

  @Input() departures: Departure[];
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  dataSource = new MatTableDataSource([]);
  columnsToDisplay = ['Departure At', 'Arrival On', 'Seats', 'Operator', 'Price'];

  columnsMap = {
    'Departure At': 'viewData.departureDateTime.time',
    'Arrival On': ['viewData.arrivalDateTime.date', 'viewData.arrivalDateTime.time'],
    Seats: 'available_seats',
    Operator: 'viewData.operator.display_name',
    Price: ['viewData.currency', 'viewData.price']
  };

  expandedDeparture: Departure | null;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.departures && changes.departures.currentValue) {

      this.dataSource = new MatTableDataSource(changes.departures.currentValue);
      this.dataSource.sort = this.sort;
    }
  }

  ngAfterViewInit() {
    this.sort.sortChange.pipe(
        startWith({}),
        switchMap(() => {
          return this.sortDepartures(this.sort.active, this.sort.direction);
        }),
        takeUntil(this.ngUnsubscribe)
    )
        .subscribe(data => this.departures = data)
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  sortDepartures(sort: string, order: string): Observable<Departure[]> {
    if (!sort || !order) {
      return of(this.departures);
    }

    return of(this.departures.sort((a, b) => {
      const value1 = this.getCellValue(a, this.columnsMap[sort]);
      const value2 = this.getCellValue(b, this.columnsMap[sort]);

      if (value1 === value2) return 0;

      if (order === 'asc') {
        if (value1 > value2) {
          return 1;
        }

        return -1;
      } else {
        if (value1 > value2) {
          return -1;
        }

        return 1;
      }

    }));
  }

  getCellValue(departure: Departure, path: string|string[]): string {
    if (!Array.isArray(path)) {
      return _.get(departure, path, 'N/A');
    }

    return path.map(item => _.get(departure, item, '')).join(' ');
  }
}
