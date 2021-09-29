import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { DurationIndicatorComponent } from './duration-indicator.component';


describe('DurationIndicatorComponent', () => {
  let component: DurationIndicatorComponent;
  let fixture: ComponentFixture<DurationIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DurationIndicatorComponent
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DurationIndicatorComponent);
    component = fixture.componentInstance;
  });

  it('initializes', () => {
    expect(component).toBeTruthy();
  });

  it('renders all elements', () => {
    component.duration = 25;
    fixture.detectChanges();

    const img = fixture.debugElement.query(By.css('.duration img.time-icon')).nativeElement;
    const timeUnits = fixture.debugElement.queryAll(By.css('.duration .time-unit'));

    expect(img).toBeTruthy();
    expect(img.getAttribute('src')).toBe('/assets/clock.svg');
    expect(img.getAttribute('alt')).toBe('duration');
    
    expect(timeUnits.length).toBe(2);
    const [hourDE, minDE] = timeUnits;
    verifyTimeUnit(hourDE, 0, 'hour');
    verifyTimeUnit(minDE, 25, 'minute');
  });

  it('displays days and not minutes for long trips', () => {
    component.duration = 2000;
    fixture.detectChanges();

    const timeUnits = fixture.debugElement.queryAll(By.css('.duration .time-unit'));
    expect(timeUnits.length).toBe(2);
    const [dayDE, hourDE] = timeUnits;
    verifyTimeUnit(dayDE, 1, 'day');
    verifyTimeUnit(hourDE, 9, 'hour');
  });

  function verifyTimeUnit(de: DebugElement, time: number, unit: string) {
    const [timeNE, unitNE] = de.queryAll(By.css('span')).map(de => de.nativeElement);

    expect(timeNE.innerHTML).toEqual(`${ time }`);
    expect(unitNE.className).toEqual('unit');
    expect(unitNE.getAttribute('appTranslate')).toBe(`duration.${ unit }Char`);
  }
});
