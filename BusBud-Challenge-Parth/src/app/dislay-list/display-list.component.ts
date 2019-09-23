import { Component } from '@angular/core';
import { Departure } from '../departure.model';

@Component({
  selector: 'app-display-list',
  templateUrl: './display-list.component.html',
  styleUrls: ['./display-list.component.css']
})
export class DisplayListComponent {
  departures: Departure[] = [];
}
