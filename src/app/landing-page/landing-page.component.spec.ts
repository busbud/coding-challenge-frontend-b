import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { DepartureService } from '@app/services';
import { Travel, TripSearch } from '@app/shared/models';
import { of } from 'rxjs';
import { LandingPageComponent } from './landing-page.component';


@Component({ selector: 'app-header' })
class HeaderComponentMock { }

@Component({ selector: 'app-trip-search' })
class TripSearchComponentMock {
  @Output() tripSearched: EventEmitter<TripSearch> = new EventEmitter();
}

@Component({ selector: 'app-result-list' })
class ResultListComponentMock {
  @Input() travelInfo: Travel | null;
}

describe('LandingPageComponent', () => {
  let component: LandingPageComponent;
  let fixture: ComponentFixture<LandingPageComponent>;

  let departureService: Partial<DepartureService>;
  let travelInfo: Partial<Travel>;

  beforeEach(async () => {
    travelInfo = { origin: 'Québec', destination: 'Montréal' };
    departureService = jasmine.createSpyObj('DepartureService', ['getDepartures']);
    (departureService.getDepartures as jasmine.Spy).and.returnValue(of(travelInfo));

    await TestBed.configureTestingModule({
      declarations: [
        LandingPageComponent,
        HeaderComponentMock,
        TripSearchComponentMock,
        ResultListComponentMock
      ],
      providers: [
        { provide: DepartureService, useValue: departureService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('initializes', () => {
    expect(component).toBeTruthy();
  });

  it('includes header', () => {
    const headerComponent = fixture.debugElement.query(By.directive(HeaderComponentMock)).componentInstance;
    expect(headerComponent).toBeTruthy();
  });

  it('includes trip search component', () => {
    const tripSearchComponent = fixture.debugElement.query(By.directive(TripSearchComponentMock)).componentInstance;
    expect(tripSearchComponent).toBeTruthy();
  });

  it('includes result list component', () => {
    const resultListComponent = fixture.debugElement.query(By.directive(ResultListComponentMock)).componentInstance;
    expect(resultListComponent).toBeTruthy();
  });

  it('includes banner', () => {
    const bannerElement = fixture.debugElement.query(By.css('.container .banner')).nativeElement;
    expect(bannerElement).toBeTruthy();
    expect(bannerElement.getAttribute('appTranslate')).toBe('banner.message');
  });


  it('includes trip search component', () => {
    const tripSearchComponent = fixture.debugElement.query(By.directive(TripSearchComponentMock)).componentInstance;
    expect(tripSearchComponent).toBeTruthy();
  });

  it('links trip search with result list', () => {
    const tripSearchComponent = fixture.debugElement.query(By.directive(TripSearchComponentMock)).componentInstance;
    const resultListComponent = fixture.debugElement.query(By.directive(ResultListComponentMock)).componentInstance;
    const tripSearch: Partial<TripSearch> = { origin: 'f2m673', destination: 'f25dvk' };

    expect(resultListComponent.travelInfo).toBe(null);

    tripSearchComponent.tripSearched.emit(tripSearch);
    fixture.detectChanges();

    expect(resultListComponent.travelInfo).toBe(travelInfo);
    expect(departureService.getDepartures).toHaveBeenCalledOnceWith(tripSearch);
  });

});
