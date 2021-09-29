import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AgeSelectorComponent } from './age-selector.component';


describe('AgeSelectorComponent', () => {
  let component: AgeSelectorComponent;
  let fixture: ComponentFixture<AgeSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AgeSelectorComponent
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgeSelectorComponent);
    component = fixture.componentInstance;
    component.code = 'ageCode';
    component.value = 4;
    component.total = 4;
    fixture.detectChanges();
  });

  it('initializes', () => {
    expect(component).toBeTruthy();
  });

  it('displays all elements', () => {
    const title = fixture.debugElement.query(By.css('.form-inline .title')).nativeElement;
    const amount = fixture.debugElement.query(By.css('.form-inline .amount')).nativeElement;
    const buttons = fixture.debugElement.queryAll(By.css('.form-inline button')).map(de => de.nativeElement);

    expect(title).toBeTruthy();
    expect(amount).toBeTruthy();
    expect(amount.innerText).toBe('4');

    const [decrease, increase] = buttons;
    expect(decrease).toBeTruthy();
    expect(increase).toBeTruthy();
  });

  it('updates the value', () => {
    const amount = fixture.debugElement.query(By.css('.form-inline .amount')).nativeElement;

    component.value = 3;
    fixture.detectChanges();

    expect(amount.innerText).toBe('3');
  });

  it('reacts to decrease button click', () => {
    const btnDE = fixture.debugElement.queryAll(By.css('.form-inline button'))[0];
    spyOn(component.valueUpdated, 'emit');

    btnDE.triggerEventHandler('click', null);
    
    expect(component.valueUpdated.emit).toHaveBeenCalledOnceWith(3);
  });

  it('reacts to increase button click', () => {
    const btnDE = fixture.debugElement.queryAll(By.css('.form-inline button'))[1];
    spyOn(component.valueUpdated, 'emit');

    btnDE.triggerEventHandler('click', null);
    
    expect(component.valueUpdated.emit).toHaveBeenCalledOnceWith(5);
  });

  it('disables decrease button if value is 0', () => {
    component.value = 0;
    fixture.detectChanges();

    const btn = fixture.debugElement.queryAll(By.css('.form-inline button'))[0].nativeElement;
    expect(btn.disabled).toBeTruthy();
  });

  it('disables decrease button if total is below 2', () => {
    component.total = 1;
    fixture.detectChanges();

    const btn = fixture.debugElement.queryAll(By.css('.form-inline button'))[0].nativeElement;
    expect(btn.disabled).toBeTruthy();
  });
});
