import {TestBed, inject} from '@angular/core/testing';

import {ApiRequestService} from './api-request.service';
import {HttpClient} from '@angular/common/http';

describe('ApiRequestService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ApiRequestService,
                {
                    provide: HttpClient,
                    useValue: {}
                }
            ]
        });
    });

    it('should be created', inject([ApiRequestService], (service: ApiRequestService) => {
        expect(service).toBeTruthy();
    }));
});
