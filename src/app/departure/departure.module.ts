import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromServices from '../departure/services';
import { DepartureComponent } from './departure.component';
import { reducers } from './store';
import { effects } from './store/effects';

export const ROUTES: Routes = [
  {
    path: '',
    component: DepartureComponent,
  },
];

@NgModule({
  declarations: [DepartureComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(ROUTES),
    StoreModule.forFeature('departures', reducers),
    EffectsModule.forFeature(effects),
  ],
  providers: [...fromServices.services],
  exports: [DepartureComponent],
})
export class DepartureModule {}
