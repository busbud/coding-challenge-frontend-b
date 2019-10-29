import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxUiLoaderModule } from 'ngx-ui-loader';


@NgModule({
  exports: [
    TranslateModule,
    FormsModule,
    NgbModule,
    InfiniteScrollModule,
    NgxUiLoaderModule
  ]
})

export class SharedModule { }