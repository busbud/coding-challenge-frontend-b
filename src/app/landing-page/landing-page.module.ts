import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { TripSearchModule } from '../trip-search/trip-search.module';
import { ResultListModule } from '../result-list/result-list.module';
import { LandingPageComponent } from './landing-page.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    LandingPageComponent,
    HeaderComponent
  ],
  imports: [
    SharedModule,
    TripSearchModule,
    ResultListModule
  ],
  exports: [
    LandingPageComponent,
  ]
})
export class LandingPageModule { }
