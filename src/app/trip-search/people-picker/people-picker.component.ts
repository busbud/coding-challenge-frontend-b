import { Component, OnInit } from '@angular/core';
import { TripConfigService } from './../services/trip-config.service';

@Component({
  selector: 'app-people-picker',
  templateUrl: './people-picker.component.html',
  styleUrls: ['./people-picker.component.scss']
})
export class PeoplePickerComponent implements OnInit {
  values: { adult: number, child: number, senior: number } = {} as any;
  count: { total: number };

  constructor(
    private tripConfigService: TripConfigService
  ) { }

  ngOnInit() {
    const { adult, child, senior } = this.tripConfigService.getQueryData();
    this.values = { adult, child, senior };
    this.calculateTotal();
  }

  updateValue(key:  'adult'|'child'|'senior', value: number) {
    this.values[key] = value;
    this.tripConfigService.setPassengers(this.values as any);
    this.calculateTotal();
  }

  private calculateTotal() {
    this.count = { total: this.values.adult + this.values.child + this.values.senior };
  }

}
