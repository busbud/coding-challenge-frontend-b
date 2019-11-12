import { Component, OnInit } from '@angular/core';
import { BusbudService } from './busbud.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  sourceGeoHash: String = 'dr5reg'; // New York
  destinationGeoHash: String = 'f25dvk'; // Montreal
  noOfPersons: Number = 1; // 1 adult
  dateOfJourney: Date = new Date();

  constructor(private busBudService: BusbudService) {}

  ngOnInit() {}

  search() {
    console.log('search clicked');
    this.busBudService.fetchResults();
  }
}
