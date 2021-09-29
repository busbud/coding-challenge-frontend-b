import { Component, Input, Output, EventEmitter, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { TripConfigService } from '../services';
import { PeoplePickerComponent } from './people-picker.component';


@Component({ selector: 'app-age-selector' })
export class AgeSelectorComponentMock {
  @Input() code: string;
  @Input() value: number;
  @Input() total: number;
  @Output() valueUpdated: EventEmitter<number> = new EventEmitter();
}

describe('PeoplePickerComponent', () => {
  let component: PeoplePickerComponent;
  let fixture: ComponentFixture<PeoplePickerComponent>;

  let tripConfigService: TripConfigService;

  beforeEach(async () => {
    tripConfigService = jasmine.createSpyObj('TripConfigService', ['getQueryData', 'setPassengers']);
    (tripConfigService.getQueryData as jasmine.Spy).and.returnValue({ adult: 1, child: 2, senior: 3 });

    await TestBed.configureTestingModule({
      declarations: [
        PeoplePickerComponent,
        AgeSelectorComponentMock
      ],
      imports: [
        NgbModule
      ],
      providers: [
        { provide: TripConfigService, useValue: tripConfigService}
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeoplePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('initializes', () => {
    expect(component).toBeTruthy();
  });

  it('calculate numbers and total', () => {
    expect(component.values.adult).toBe(1);
    expect(component.values.child).toBe(2);
    expect(component.values.senior).toBe(3);
    expect(component.count.total).toBe(6);
  });

  it('displays number of passengers', () => {
    const title = fixture.debugElement.query(By.css('.form-control .input-title')).nativeElement;
    const count = fixture.debugElement.query(By.css('.form-control .travelers')).nativeElement;

    expect(title.getAttribute('appTranslate')).toBe('people-picker.passengers');
    expect(count.getAttribute('appTranslate')).toBe('people-picker.passenger-count');
  });

  it('displays the selectors for each age range', () => {
    const selectors = fixture.debugElement.queryAll(By.directive(AgeSelectorComponentMock));

    expect(selectors.length).toBe(3);
  });

  it('configures and reacts to the adult selector', () => {
    const selector = fixture.debugElement.queryAll(By.directive(AgeSelectorComponentMock))[0].componentInstance;

    verifySelector(selector, 'adults', 1);
    expect(tripConfigService.setPassengers).toHaveBeenCalledOnceWith({ adult: 2, child: 2, senior: 3 });
  });

  it('configures and reacts to the child selector', () => {
    const selector = fixture.debugElement.queryAll(By.directive(AgeSelectorComponentMock))[1].componentInstance;

    verifySelector(selector, 'children', 2);
    expect(tripConfigService.setPassengers).toHaveBeenCalledOnceWith({ adult: 1, child: 3, senior: 3 });
  });

  it('configures and reacts to the senior selector', () => {
    const selector = fixture.debugElement.queryAll(By.directive(AgeSelectorComponentMock))[2].componentInstance;

    verifySelector(selector, 'seniors', 3);
    expect(tripConfigService.setPassengers).toHaveBeenCalledOnceWith({ adult: 1, child: 2, senior: 4 });
  });

  function verifySelector(selector: AgeSelectorComponentMock, code: string, value: number) {
    expect(selector.code).toBe(code);
    expect(selector.value).toBe(value);
    expect(selector.total).toBe(6);

    selector.valueUpdated.emit(value + 1);

    expect(component.count.total).toBe(7);
  }
});
