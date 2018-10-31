import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { DepartureModule } from './departure/departure.module';

export const ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'departures' },
  {
    path: 'departure',
    loadChildren: './departure/departure.module#DepartureModule',
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    DepartureModule,
    RouterModule.forRoot(ROUTES),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
