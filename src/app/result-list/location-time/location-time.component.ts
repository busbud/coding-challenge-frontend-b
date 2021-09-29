import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-location-time',
  templateUrl: './location-time.component.html',
  styleUrls: ['./location-time.component.scss']
})
export class LocationTimeComponent {
  @Input() time: string;
  @Input() city: string;
  @Input() location: string;
  @Input() displayLeft: boolean = false;
  @Input() daysAfter: number = 0;

}
