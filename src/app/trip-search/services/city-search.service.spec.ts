import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { LanguageService } from '@app/services';
import { CitySearchService } from './city-search.service';


describe('CitySearchService', () => {
  let service: CitySearchService;

  let languageService: Partial<LanguageService>;

  beforeEach(() => {
    languageService = jasmine.createSpyObj('languageService', ['getLanguageValue']);
    (languageService.getLanguageValue as jasmine.Spy).and.returnValue('en');

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        { provide: LanguageService, useValue: languageService }
      ]
    });
    service = TestBed.inject(CitySearchService);
  });

  it('initializes', () => {
    expect(service).toBeTruthy();
  });
});
