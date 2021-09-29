import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { InfoBannerComponent } from './info-banner/info-banner.component';
import { LocationTimeComponent } from './location-time/location-time.component';
import { DurationIndicatorComponent } from './duration-indicator/duration-indicator.component';
import { DepartureComponent } from './departure/departure.component';
import { ResultListComponent } from './result-list.component';


@NgModule({
  declarations: [
    ResultListComponent,
    DepartureComponent,
    DurationIndicatorComponent,
    LocationTimeComponent,
    InfoBannerComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    ResultListComponent
  ]
})
export class ResultListModule { }
