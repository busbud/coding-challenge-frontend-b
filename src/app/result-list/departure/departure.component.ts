import { Component, Input, OnInit } from '@angular/core';
import { CurrencyService } from 'src/app/services/currency.service';
import { Departure } from 'src/app/services/departure.service';

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
  formattedPrice: string;
  formattedCurrency: string;
  operatorLogo: string;
  origin: string;
  destination: string;
  daysAfter: number;

  constructor(
    private currencyService: CurrencyService
  ) { }

  ngOnInit(): void {
    this.formattedPrice = (this.departureData.price / 100).toLocaleString();
    this.formattedCurrency = this.formatCurrency(this.departureData);
    this.origin = this.locations.find(loc => loc.id === this.departureData.originId)?.name || '';
    this.destination = this.locations.find(loc => loc.id === this.departureData.destinationId)?.name || '';
    this.operatorLogo = this.operators.find(op => op.id === this.departureData.operatorId)?.logoUrl || '';
    this.daysAfter = this.calculateDaysAfter(this.departureData.departureTime, this.departureData.arrivalTime);
  }

  private formatCurrency({ currency }: Departure) {
    const currencies = this.currencyService.getCurrencyOptions();
    const selected = currencies.find(cur => cur.value === currency) || currencies[0];
    
    return selected.label;
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
