import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CitySearchService, TripConfigService } from '../services';
import { CityPickerComponent } from './city-picker.component';

describe('CityPickerComponent', () => {
  let component: CityPickerComponent;
  let fixture: ComponentFixture<CityPickerComponent>;
  
  let citySearchService: CitySearchService;
  let tripConfigService: TripConfigService;

  beforeEach(async () => {
    citySearchService = jasmine.createSpyObj('CitySearchService', ['search']);
    tripConfigService = jasmine.createSpyObj('TripConfigService', ['setOrigin', 'setDestination']);

    await TestBed.configureTestingModule({
      declarations: [
        CityPickerComponent
      ],
      imports: [
        NgbModule
      ],
      providers: [
        { provide: CitySearchService, useValue: citySearchService },
        { provide: TripConfigService, useValue: tripConfigService }
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CityPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('initializes', () => {
    expect(component).toBeTruthy();
  });
});
