import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApiRequestService } from './api-request/api-request.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule
    ],
    providers:[ApiRequestService
    ],
    declarations: [
    ],
    exports: [
    ],
    entryComponents: [
    ]
})
export class TravelCommonModule {}
