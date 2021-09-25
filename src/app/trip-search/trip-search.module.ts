import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CityPickerComponent } from './city-picker/city-picker.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { TripSearchComponent } from './trip-search.component';

@NgModule({
  declarations: [
    TripSearchComponent,
    DatePickerComponent,
    CityPickerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule
  ],
  exports: [
    TripSearchComponent
  ]
})
export class TripSearchModule { }
