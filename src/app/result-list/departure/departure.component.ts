import { Component, Input, OnChanges } from '@angular/core';
import { CurrencyService } from 'src/app/services/currency.service';
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
  operatorLogo: string;
  origin: string;
  destination: string;

  constructor(
    private currencyService: CurrencyService
  ) { }

  ngOnChanges(): void {
    this.formattedPrice = (this.departureData.price / 100).toLocaleString();
    this.formattedCurrency = this.formatCurrency(this.departureData);
    this.origin = this.locations.find(loc => loc.id === this.departureData.originId)?.name || '';
    this.destination = this.locations.find(loc => loc.id === this.departureData.destinationId)?.name || '';
    this.operatorLogo = this.operators.find(op => op.id === this.departureData.operatorId)?.logoUrl || '';
  }

  private formatCurrency({ currency }: Departure) {
    const currencies = this.currencyService.getCurrencyOptions();
    const selected = currencies.find(cur => cur.value === currency) || currencies[0];
    
    return selected.label;
  }

}
