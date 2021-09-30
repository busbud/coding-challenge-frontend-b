import { Component, Input, Output, EventEmitter, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Departure, Option, Travel } from '@app/shared/models';
import { InfoBannerComponent } from './info-banner/info-banner.component';
import { ResultListComponent } from './result-list.component';



@Component({ selector: 'app-dropdown-selector' })
class DropdownSelectorComponentMock {
  @Input() options: Option[] = [];
  @Input() selectedValue: string | null;
  @Input() emitFullOption: boolean = false;
  @Input() style: string = 'normal';
  @Output() optionSelected: EventEmitter<any> = new EventEmitter();
}

@Component({ selector: 'app-departure' })
class DepartureComponentMock {
  @Input() departureData: Departure;
  @Input() locations: { id: number, name: string }[];
  @Input() operators: { id: string, name: string, logoUrl: string }[];
  @Input() originCity: string;
  @Input() destinationCity: string;
}

describe('ResultListComponent', () => {
  let component: ResultListComponent;
  let fixture: ComponentFixture<ResultListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ResultListComponent,
        InfoBannerComponent,
        DropdownSelectorComponentMock,
        DepartureComponentMock
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultListComponent);
    component = fixture.componentInstance;
    component.travelInfo = {
      origin: 'OriginCity',
      destination: 'DestinationCity',
      locations: [{ id: 123, name: 'Location1' }, { id: 321, name: 'Location2' }],
      operators: [{ id: 'op1', name: 'Alsa', logoUrl: '/path/to/logo' }],
      departures: [
        generateDeparture('id0-none', '2021-02-01T12:00:00', 200, 1000),
        generateDeparture('id1-cheapest', '2021-02-01T12:00:00', 200, 500),
        generateDeparture('id2-fastest', '2021-02-01T12:00:00', 100, 1000),
        generateDeparture('id3-earliest', '2021-02-01T06:00:00', 200, 1000),
        generateDeparture('id4-latest', '2021-02-01T18:00:00', 200, 1000)
      ],
      complete: true,
      error: false
    }
    fixture.detectChanges();
  });

  it('initializes', () => {
    expect(component).toBeTruthy();
  });

  describe('header', () => {
    let dropdown: DropdownSelectorComponentMock;
    
    beforeEach(() => {
      dropdown = fixture.debugElement.query(By.directive(DropdownSelectorComponentMock)).componentInstance;
    });
    
    it('displays all elements', () => {
      const title = fixture.debugElement.query(By.css('.header .title.sub-header .title-text'));
      const spinner = fixture.debugElement.query(By.css('.header .title.sub-header .spinner-border'));
      const sortingIcon = fixture.debugElement.query(By.css('.header .sub-header .sort-icon'));

      expect(title.nativeElement.getAttribute('appTranslate')).toBe('result-list.title');
      expect(spinner).toBeNull();
      expect(sortingIcon.nativeElement.getAttribute('src')).toBe('/assets/sort-down.svg');
      expect(sortingIcon.nativeElement.getAttribute('alt')).toBe('sort by');
      expect(dropdown).toBeTruthy();
    });
    
    it('links to the dropdown', () => {
      expect(dropdown.options).toBe(component.sortingOptions);
      expect(dropdown.emitFullOption).toBe(true);
      expect(dropdown.style).toBe('long');
      expect(component.sorting).toEqual({ value: 'price' });

      dropdown.optionSelected.emit(component.sortingOptions[2]);
      expect(component.sorting).toEqual({ value: 'departureTime', label: 'result-list.orderby.departureTime' } as any);
    });
    
    it('displays spinner while loading', () => {
      (component.travelInfo as Travel).complete = false;
      fixture.detectChanges();
      const spinner = fixture.debugElement.query(By.css('.header .title.sub-header .spinner-border'));

      expect(spinner.nativeElement.getAttribute('role')).toBe('status');
    });
  });

  describe('info banners', () => {
    it('on error', () => {
      (component.travelInfo as Travel).error = true;
      fixture.detectChanges();
      const banners = fixture.debugElement.queryAll(By.directive(InfoBannerComponent));

      expect(banners.length).toBe(1);
      expect(banners[0].componentInstance.type).toBe('error');
    });

    it('on loading', () => {
      (component.travelInfo as Travel).complete = false;
      fixture.detectChanges();
      const banners = fixture.debugElement.queryAll(By.directive(InfoBannerComponent));

      expect(banners.length).toBe(1);
      expect(banners[0].componentInstance.type).toBe('loading');
    });

    it('on no departures', () => {
      (component.travelInfo as Travel).departures = [];
      fixture.detectChanges();
      const banners = fixture.debugElement.queryAll(By.directive(InfoBannerComponent));

      expect(banners.length).toBe(1);
      expect(banners[0].componentInstance.type).toBe('noDepartures');
    });
  });

  describe('departure list', () => {
    it('displays all departures', () => {
      const departures = fixture.debugElement.queryAll(By.directive(DepartureComponentMock));

      expect(departures.length).toBe(5);
      verifyDeparture(departures[0].componentInstance, (component.travelInfo as Travel).departures[0]);
      verifyDeparture(departures[1].componentInstance, (component.travelInfo as Travel).departures[1]);
      verifyDeparture(departures[2].componentInstance, (component.travelInfo as Travel).departures[2]);
      verifyDeparture(departures[3].componentInstance, (component.travelInfo as Travel).departures[3]);
      verifyDeparture(departures[4].componentInstance, (component.travelInfo as Travel).departures[4]);
    });
    
    it('orders by price', () => {
      component.sorting = { value: 'price' };
      fixture.detectChanges();
      const firstResult: DepartureComponentMock = fixture.debugElement
        .queryAll(By.directive(DepartureComponentMock))[0].componentInstance;

      expect(firstResult.departureData.id).toBe('id1-cheapest');
    });
    
    it('orders by duration', () => {
      component.sorting = { value: 'duration' };
      fixture.detectChanges();
      const firstResult: DepartureComponentMock = fixture.debugElement
        .queryAll(By.directive(DepartureComponentMock))[0].componentInstance;

      expect(firstResult.departureData.id).toBe('id2-fastest');
    });
    
    it('orders by time of departure, earliest', () => {
      component.sorting = { value: 'departureTime' };
      fixture.detectChanges();
      const firstResult: DepartureComponentMock = fixture.debugElement
        .queryAll(By.directive(DepartureComponentMock))[0].componentInstance;

      expect(firstResult.departureData.id).toBe('id3-earliest');
    });
    
    it('orders by time of departure, latest', () => {
      component.sorting = { value: 'departureTime', reversed: true };
      fixture.detectChanges();
      const firstResult: DepartureComponentMock = fixture.debugElement
        .queryAll(By.directive(DepartureComponentMock))[0].componentInstance;

      expect(firstResult.departureData.id).toBe('id4-latest');
    });
  });

  function generateDeparture(id: string, departureTime: string, duration: number, price: number ) {
    return {
      arrivalTime: '2021-02-02T20:00:00',
      departureTime,
      originId: 123,
      destinationId: 321,
      duration,
      operatorId: 'op1',
      price,
      currency: 'USD',
      id
    }
  }

  function verifyDeparture(depCmp: DepartureComponentMock, info: Departure) {
    expect(depCmp.departureData).toBe(info);
    expect(depCmp.locations).toBe((component.travelInfo as Travel).locations);
    expect(depCmp.operators).toBe((component.travelInfo as Travel).operators);
    expect(depCmp.originCity).toBe((component.travelInfo as Travel).origin);
    expect(depCmp.destinationCity).toBe((component.travelInfo as Travel).destination);
  }

});
