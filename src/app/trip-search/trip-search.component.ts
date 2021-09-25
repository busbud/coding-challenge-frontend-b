import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trip-search',
  templateUrl: './trip-search.component.html',
  styleUrls: ['./trip-search.component.scss']
})
export class TripSearchComponent implements OnInit {

  public origin: string = "";
  public destination: string = "";
  public outboundDate: string = "";
  public searchReady: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  selectOrigin(cityGeohash: string) {
    console.log("Actualizamos el viaje, from", cityGeohash);
    this.origin = cityGeohash;
    this.checkReady();
  }

  selectDestination(cityGeohash: string) {
    console.log("Actualizamos el viaje, to", cityGeohash);
    this.destination = cityGeohash;
    this.checkReady();
  }

  selectOutboundDate(dateISO: string) {
    console.log("Actualizamos el viaje, date", dateISO);
    this.outboundDate = dateISO;
    this.checkReady();
  }

  searchTrips() {
    console.log('Buscamos viajes');
  }

  private checkReady() {
    this.searchReady = !!this.origin && !!this.destination && !!this.outboundDate;
  }
  

}
