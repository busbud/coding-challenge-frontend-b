import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DepartureComponent } from './departure/departure.component';
import { DurationIndicatorComponent } from './duration-indicator/duration-indicator.component';
import { ResultListComponent } from './result-list.component';
import { LocationTimeComponent } from './location-time/location-time.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ResultListComponent,
    DepartureComponent,
    DurationIndicatorComponent,
    LocationTimeComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    ResultListComponent
  ]
})
export class ResultListModule { }
