import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-duration-indicator',
  templateUrl: './duration-indicator.component.html',
  styleUrls: ['./duration-indicator.component.scss']
})
export class DurationIndicatorComponent implements OnInit {
  @Input() duration: number;
  days: number;
  hours: number;
  minutes: number;
  dayChar: string;
  hourChar: string;
  minuteChar: string;

  constructor() { }

  ngOnInit(): void {
    this.formatDuration(this.duration);
    this.formatDisplay();
  }

  private formatDuration(duration: number) {
    const minsInDay = 24 * 60;
    duration = Math.max(duration, 0);
    this.days = Math.floor(duration / minsInDay);
    this.hours = Math.floor((duration % minsInDay) / 60);
    this.minutes = duration % 60;
  }

  private formatDisplay() {
    this.dayChar = 'D';
    this.hourChar = 'H';
    this.minuteChar = 'M';
  }
}
