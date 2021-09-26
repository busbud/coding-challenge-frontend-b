import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CityPickerComponent } from './city-picker/city-picker.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { TripSearchComponent } from './trip-search.component';
import { PeoplePickerComponent } from './people-picker/people-picker.component';
import { AgeSelectorComponent } from './age-selector/age-selector.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    TripSearchComponent,
    DatePickerComponent,
    CityPickerComponent,
    PeoplePickerComponent,
    AgeSelectorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  exports: [
    TripSearchComponent
  ]
})
export class TripSearchModule { }
