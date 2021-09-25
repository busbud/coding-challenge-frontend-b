import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit {
  date: NgbDateStruct;
  today: NgbDateStruct;

  @Output() dateSelected: EventEmitter<string> = new EventEmitter();

  constructor(
    calendar: NgbCalendar
  ) {
    this.today = calendar.getToday();
    this.date = this.today;
  }

  ngOnInit(): void {
    this.selectDate(this.date);
  }
  
  manualDate(dateStr: any) {
    setTimeout(() => this.verifyDate(this.date as any), 0);
  }

  verifyDate(date: string) {
    console.log(date, typeof date);
    if (typeof date === "object") {
      const { year, month, day } = date;
      const today = new Date();
      if(today.getFullYear() <= year && (today.getMonth() + 1) <= month && today.getDate() <= day ) {
        this.selectDate(date);
      } else {
        this.dateSelected.emit("");
      }
    }
  }

  selectDate(date: NgbDateStruct) {
    const { year, month, day } = date;
    const parsedDate = new Date(year, month - 1, day);
    this.dateSelected.emit(this.ignoreTimeZone(parsedDate).toISOString());
  }

  private ignoreTimeZone(date: Date) {
    // With this we avoid timezone issues when converting the date. Can be removed if it´s desired.
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
  }
}
