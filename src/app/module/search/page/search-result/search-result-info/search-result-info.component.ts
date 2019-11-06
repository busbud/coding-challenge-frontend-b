import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import { City } from '@data/schema/city';

@Component({
  selector: 'app-search-result-info',
  templateUrl: './search-result-info.component.html',
  styleUrls: ['./search-result-info.component.scss']
})
export class SearchResultInfoComponent implements OnInit {

  @Input() departure: City;
  @Input() arrival: City;
  @Input() outboundDate: string;
  @Input() adults: number;
  @Input() seniors: number;
  @Input() children: number;

  constructor() { }

  ngOnInit() {
  }

}
