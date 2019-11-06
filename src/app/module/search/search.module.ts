import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@shared/shared.module';
import { SearchFormComponent } from './page/search-form/search-form.component';
import { SearchRoutingModule } from './search.routing';
import { SearchResultComponent } from './page/search-result/search-result.component';
import { SearchResultInfoComponent } from './page/search-result/search-result-info/search-result-info.component';
import { SearchResultDeparturesComponent } from './page/search-result/search-result-departures/search-result-departures.component';
import {
    DeparturesEffects,
    SearchFormEffects
} from './state-management/effects';
import {
    reducers,
    searchModuleFeatureKey
} from './state-management/reducers';


@NgModule({
  declarations: [
      SearchFormComponent,
      SearchResultComponent,
      SearchResultInfoComponent,
      SearchResultDeparturesComponent,
  ],
  imports: [
    SharedModule,
    SearchRoutingModule,
    StoreModule.forFeature(searchModuleFeatureKey, reducers),
    EffectsModule.forFeature([SearchFormEffects, DeparturesEffects]),
  ],
  exports: [],
  providers: []
})
export class SearchModule { }
