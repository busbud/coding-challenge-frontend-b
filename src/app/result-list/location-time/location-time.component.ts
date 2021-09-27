import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-location-time',
  templateUrl: './location-time.component.html',
  styleUrls: ['./location-time.component.scss']
})
export class LocationTimeComponent implements OnInit {
  @Input() time: string;
  @Input() city: string;
  @Input() location: string;
  @Input() displayLeft: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
