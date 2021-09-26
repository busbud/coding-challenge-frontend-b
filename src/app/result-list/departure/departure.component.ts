import { Component, Input, OnChanges } from '@angular/core';
import { Departure } from 'src/app/services/departure.service';

@Component({
  selector: 'app-departure',
  templateUrl: './departure.component.html',
  styleUrls: ['./departure.component.scss']
})
export class DepartureComponent implements OnChanges {
  @Input() departureData: Departure;
  @Input() locations: { id: number, name: string }[];
  @Input() operators: { id: string, name: string, logoUrl: string }[];
  @Input() originCity: string;
  @Input() destinationCity: string;
  formattedPrice: string;
  formattedCurrency: string;
  operatorLogo: string|undefined;
  origin: string|undefined;
  destination: string|undefined;
  duration: { days: number, hours: number, minutes: number };

  constructor() { }

  ngOnChanges(): void {
    this.formattedPrice = (this.departureData.price / 100).toLocaleString();;
    this.formattedCurrency = this.formatCurrency(this.departureData);
    this.origin = this.locations.find(loc => loc.id === this.departureData.originId)?.name;
    this.destination = this.locations.find(loc => loc.id === this.departureData.destinationId)?.name;
    this.operatorLogo = this.operators.find(op => op.id === this.departureData.operatorId)?.logoUrl;
    this.duration = this.formatDuration(this.departureData);
  }

  private formatCurrency({ price, currency }: Departure) {
    switch(currency) {
      case 'EUR': return '€';
      case 'CAD': return 'CAD';
      default: return 'US$';
    }
  }

  private formatDuration({ duration }: Departure) {
    const minsInDay = 24 * 60;
    const days = Math.floor(duration / minsInDay);
    const hours = Math.floor((duration % minsInDay) / 60);
    const minutes = duration % 60;
    return { days, hours, minutes }
  }

}
