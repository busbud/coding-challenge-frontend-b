import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DropdownSelectorComponent } from './dropdown-selector/dropdown-selector.component';

@NgModule({
  declarations: [
    DropdownSelectorComponent
  ],
  imports: [
    CommonModule,
    NgbModule
  ],
  exports: [
    DropdownSelectorComponent
  ]
})
export class SharedModule { }
