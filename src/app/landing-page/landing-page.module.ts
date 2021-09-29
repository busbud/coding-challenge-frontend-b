import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { TripSearchModule } from '@app/trip-search';
import { ResultListModule } from '@app/result-list';
import { HeaderComponent } from './header/header.component';
import { LandingPageComponent } from './landing-page.component';


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
