import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { CityPickerComponent } from './city-picker/city-picker.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { TripSearchComponent } from './trip-search.component';
import { PeoplePickerComponent } from './people-picker/people-picker.component';
import { AgeSelectorComponent } from './age-selector/age-selector.component';

@NgModule({
  declarations: [
    TripSearchComponent,
    DatePickerComponent,
    CityPickerComponent,
    PeoplePickerComponent,
    AgeSelectorComponent
  ],
  imports: [
    FormsModule,
    SharedModule
  ],
  exports: [
    TripSearchComponent
  ]
})
export class TripSearchModule { }
