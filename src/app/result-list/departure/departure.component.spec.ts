import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartureComponent } from './departure.component';


describe('DepartureComponent', () => {
  let component: DepartureComponent;
  let fixture: ComponentFixture<DepartureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DepartureComponent
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartureComponent);
    component = fixture.componentInstance;
    component.departureData = {
      arrivalTime: '2020-01-01T00:00:00',
      departureTime: '2020-01-01T00:00:00',
      originId: 0,
      destinationId: 0,
      duration: 0,
      operatorId: '',
      price:0,
      currency: 'USD',
      id: 'string;'
    };
    component.operators = [];
    component.locations = [];
    fixture.detectChanges();
  });

  it('initializes', () => {
    expect(component).toBeTruthy();
  });
});
