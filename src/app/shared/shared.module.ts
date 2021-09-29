import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DropdownSelectorComponent } from './dropdown-selector/dropdown-selector.component';
import { TranslateDirective } from './translate-directive/translate.directive';


@NgModule({
  declarations: [
    DropdownSelectorComponent,
    TranslateDirective
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NgbModule
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    NgbModule,
    DropdownSelectorComponent,
    TranslateDirective
  ]
})
export class SharedModule { }
