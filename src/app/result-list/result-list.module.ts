import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { DepartureComponent } from './departure/departure.component';
import { DurationIndicatorComponent } from './duration-indicator/duration-indicator.component';
import { ResultListComponent } from './result-list.component';
import { LocationTimeComponent } from './location-time/location-time.component';
import { InfoBannerComponent } from './info-banner/info-banner.component';

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
