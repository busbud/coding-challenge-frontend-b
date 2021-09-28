import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DropdownSelectorComponent } from './dropdown-selector/dropdown-selector.component';
import { TranslateDirective } from './translate-directive/translate.directive';
import { HttpClientModule } from '@angular/common/http';

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
