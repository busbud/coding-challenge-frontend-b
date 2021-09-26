import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { TripConfigService } from './../services/trip-config.service';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit {
  date: NgbDateStruct;
  today: NgbDateStruct;
  isValid: boolean = true;

  constructor(
    calendar: NgbCalendar,
    private tripConfigService: TripConfigService
  ) {
    this.date = this.today = calendar.getToday();
  }

  ngOnInit(): void {
    this.selectDate(this.date);
  }
  
  manualDate() {
    setTimeout(() => this.verifyDate(this.date), 0);
  }

  verifyDate(date: NgbDateStruct|string) {
    // If the date is an object, the calendar has already converted it, so it is a valid date.
    if (typeof date === "object" && this.parseDate(date) >= this.parseDate(this.today)) {
        this.selectDate(date);
    } else {
      this.isValid = false;
      this.tripConfigService.setOutboundDate("");
    }
  }

  selectDate(date: NgbDateStruct) {
    this.isValid = true;
    this.tripConfigService.setOutboundDate(this.parseDate(date).toISOString());
  }

  private parseDate(date: NgbDateStruct): Date {
    const { year, month, day } = date;
    const parsedDate = new Date(year, month - 1, day);
    // With this we avoid timezone issues when converting the date. Can be removed if it´s desired.
    return new Date(parsedDate.getTime() - parsedDate.getTimezoneOffset() * 60000)
  }
}
