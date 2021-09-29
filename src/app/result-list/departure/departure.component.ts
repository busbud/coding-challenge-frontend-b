import { Component, Input, OnInit } from '@angular/core';

import { Departure } from '@app/shared/models';


@Component({
  selector: 'app-departure',
  templateUrl: './departure.component.html',
  styleUrls: ['./departure.component.scss']
})
export class DepartureComponent implements OnInit {
  @Input() departureData: Departure;
  @Input() locations: { id: number, name: string }[];
  @Input() operators: { id: string, name: string, logoUrl: string }[];
  @Input() originCity: string;
  @Input() destinationCity: string;
  operatorLogo: string;
  origin: string;
  destination: string;
  daysAfter: number;
  price: number;
  currency: string;

  ngOnInit(): void {
    this.price = this.departureData.price;
    this.currency = this.departureData.currency;
    this.origin = this.locations.find(loc => loc.id === this.departureData.originId)?.name || '';
    this.destination = this.locations.find(loc => loc.id === this.departureData.destinationId)?.name || '';
    this.operatorLogo = this.operators.find(op => op.id === this.departureData.operatorId)?.logoUrl || '';
    this.daysAfter = this.calculateDaysAfter(this.departureData.departureTime, this.departureData.arrivalTime);
  }

  private calculateDaysAfter(departure: string, arrival: string): number {
    const departureDate = this.toDate(departure);
    const arrivalDate = this.toDate(arrival);
    const milisInDay = 24 * 60 * 60 * 1000;
    return  Math.floor((arrivalDate.getTime() - departureDate.getTime()) / milisInDay);
  }

  private toDate(date: string): Date {
    const [year, month, day] = date.split('T')[0].split('-').map(str => Number.parseInt(str));
    return new Date(year, month - 1, day);
  }

}
