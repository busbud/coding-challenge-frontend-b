import { Component, CUSTOM_ELEMENTS_SCHEMA, DebugElement, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartureComponent } from './departure.component';
import { LocationTimeComponent } from '..';
import { By } from '@angular/platform-browser';

@Component({ selector: 'app-duration-indicator' })
class DurationIndicatorComponentMock {
  @Input() duration: number;
}

describe('DepartureComponent', () => {
  let component: DepartureComponent;
  let fixture: ComponentFixture<DepartureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DepartureComponent,
        DurationIndicatorComponentMock,
        LocationTimeComponent
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
      arrivalTime: '2021-02-02T12:00:00',
      departureTime: '2021-02-01T00:00:00',
      originId: 123,
      destinationId: 321,
      duration: 200,
      operatorId: 'op1',
      price:1000,
      currency: 'USD',
      id: 'id1'
    };
    component.operators = [{ id: 'op1', name: 'Alsa', logoUrl: '/path/to/logo' }];
    component.locations = [{ id: 123, name: 'OriginLocation' }, { id: 321, name: 'DestinationLocation' }];
    component.originCity = 'OriginCity';
    component.destinationCity = 'DestinationCity';
    fixture.detectChanges();
  });

  it('initializes', () => {
    expect(component).toBeTruthy();
  });

  it('displays logo', () => {
    const logo = fixture.debugElement.query(By.css('.upper-section .logo')).nativeElement;

    expect(logo.getAttribute('src')).toBe('/path/to/logo');
  });

  it('displays price', () => {
    const price = fixture.debugElement.query(By.css('.upper-section .price span')).nativeElement;

    expect(price.innerText).toBe('$10.00');
  });

  it('displays locations info', () => {
    const [originDE, destinationDE] = fixture.debugElement.queryAll(By.directive(LocationTimeComponent));
    const arrow = fixture.debugElement.query(By.css('.middle-section .arrow-right')).nativeElement;

    expect(arrow.getAttribute('src')).toBe('/assets/right-arrow.svg');
    expect(arrow.getAttribute('alt')).toBe('destinated to');
    verifyLocationTime(originDE, true);
    verifyLocationTime(destinationDE, false);
  });

  it('avoids negative days difference', () => {
    component.departureData.arrivalTime = '2021-01-25T12:00:00';
    component.ngOnInit();
    fixture.detectChanges();
    const destinationDE = fixture.debugElement.queryAll(By.directive(LocationTimeComponent))[1];
    const locTimeCmp: LocationTimeComponent = destinationDE.componentInstance;
    
    expect(locTimeCmp.daysAfter).toBe(0);
  });

  it('displays trip duration', () => {
    const durationCmp = fixture.debugElement.query(By.directive(DurationIndicatorComponentMock)).componentInstance;

    expect(durationCmp.duration).toBe(200);
  });

  it('displays buy button', () => {
    const button = fixture.debugElement.query(By.css('.bottom-section button')).nativeElement;

    expect(button.getAttribute('appTranslate')).toBe('buy-button');
  });

  function verifyLocationTime(de: DebugElement, isOrigin: boolean) {
    const locTimeCmp: LocationTimeComponent = de.componentInstance;
    expect(locTimeCmp.displayLeft).toBe(isOrigin);
    expect(locTimeCmp.city).toBe(isOrigin ? 'OriginCity' : 'DestinationCity');
    expect(locTimeCmp.location).toBe(isOrigin ? 'OriginLocation' : 'DestinationLocation');
    expect(locTimeCmp.time).toBe(isOrigin ? '2021-02-01T00:00:00' : '2021-02-02T12:00:00');
    expect(locTimeCmp.daysAfter).toBe(isOrigin ? 0 : 1);
  }
});
