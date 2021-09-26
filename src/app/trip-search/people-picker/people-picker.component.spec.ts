import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeoplePickerComponent } from './people-picker.component';

describe('PeoplePickerComponent', () => {
  let component: PeoplePickerComponent;
  let fixture: ComponentFixture<PeoplePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeoplePickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeoplePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
