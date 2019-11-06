import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { City } from '@data/schema/city';
import { CitiesService } from '@data/service/cities.service';
import {
  SearchFormActions,
  SearchFormApiActions
} from '../../state-management/actions';

import * as fromSearchForm from '../../state-management/reducers/search-form.reducer';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {

  searchFormGroup: FormGroup;
  departures$: Observable<City[]>;
  arrivals$: Observable<City[]>;
  minDepartureDate = new Date(2020, 7, 1);
  maxDepartureDate = new Date(2020, 7, 31);

  constructor(
      private fb: FormBuilder,
      private store: Store<fromSearchForm.State>,
      private citiesService: CitiesService
  ) {
    this.store.dispatch(SearchFormActions.openForm());

    this.searchFormGroup = fb.group({
      departure: new FormControl('', { validators: Validators.required }),
      arrival: new FormControl('', { validators: Validators.required }),
      outboundDate: new FormControl('', { validators: Validators.required }),
      adults: new FormControl(0, { validators: [Validators.required, Validators.max(5)] }),
      children: new FormControl(0, { validators: [Validators.required, Validators.max(5)]}),
      seniors: new FormControl(0, { validators: [Validators.required, Validators.max(5)] }),
    });
  }

  get isValidForm(): boolean {
    return this.searchFormGroup.valid;
  }

  get hasIncorrectPeopleSelected(): boolean {
    const seniors = this.searchFormGroup.get('seniors').value || 0;
    const children = this.searchFormGroup.get('children').value || 0;
    const adults = this.searchFormGroup.get('adults').value || 0;

    const total = seniors + children + adults;

    return (!total &&
        (
            (!this.searchFormGroup.get('seniors').pristine) ||
            (!this.searchFormGroup.get('children').pristine) ||
            (!this.searchFormGroup.get('adults').pristine)
        ))  ||
        (!total && this.isValidForm);
  }

  ngOnInit() {
    this.departures$ = this.citiesService.getDepartureCities();
    this.arrivals$ = this.citiesService.getArrivalCities();
  }

  onSearchClick() {
    this.store.dispatch(SearchFormApiActions.formSubmitted({
      submitted: true,
      data: {
        departure: this.searchFormGroup.get('departure').value,
        arrival: this.searchFormGroup.get('arrival').value,
        outboundDate: this.searchFormGroup.get('outboundDate').value.toISOString(),
        adults: this.searchFormGroup.get('adults').value,
        seniors: this.searchFormGroup.get('seniors').value,
        children: this.searchFormGroup.get('children').value,
      }
    }));
  }
}
