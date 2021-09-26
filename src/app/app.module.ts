import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ResultListComponent } from './result-list/result-list.component';
import { TripSearchModule } from './trip-search/trip-search.module';
import { DepartureComponent } from './result-list/departure/departure.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    ResultListComponent,
    DepartureComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    TripSearchModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
