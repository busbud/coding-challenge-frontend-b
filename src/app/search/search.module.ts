import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from "./search.component";
import { SearchService } from './search.service';
import { SharedModule } from '../shared.module';
import { SearchHeaderComponent } from './search-header/search-header.component';
import { SearchFilterComponent } from './search-filter/search-filter.component';
import { SearchResultComponent } from './search-result/search-result.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule
    ],
    providers: [SearchService],
    declarations: [
        SearchComponent,
        SearchHeaderComponent,
        SearchFilterComponent,
        SearchResultComponent
    ]
})
export class SearchModule {}
