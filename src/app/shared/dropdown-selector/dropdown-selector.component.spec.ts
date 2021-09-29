import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownSelectorComponent } from './dropdown-selector.component';


describe('DropdownSelectorComponent', () => {
  let component: DropdownSelectorComponent;
  let fixture: ComponentFixture<DropdownSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DropdownSelectorComponent
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('initializes', () => {
    expect(component).toBeTruthy();
  });
});
