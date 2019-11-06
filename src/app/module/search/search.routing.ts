import { NgModule } from '@angular/core';
import {
    RouterModule,
    Routes
} from '@angular/router';
import { FormSubmittedGuard } from './guards/form-submitted.guard';
import { SearchFormComponent } from './page/search-form/search-form.component';
import { SearchResultComponent } from './page/search-result/search-result.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/search/form',
        pathMatch: 'full'
    },
    {
        path: '',
        children: [
            {
                path: 'form',
                component: SearchFormComponent
            },
            {
                path: 'result',
                component: SearchResultComponent,
                canActivate: [FormSubmittedGuard],
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'form'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SearchRoutingModule {}
