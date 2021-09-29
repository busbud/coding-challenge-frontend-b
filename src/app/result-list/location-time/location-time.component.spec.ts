import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationTimeComponent } from './location-time.component';


describe('LocationTimeComponent', () => {
  let component: LocationTimeComponent;
  let fixture: ComponentFixture<LocationTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        LocationTimeComponent
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('initializes', () => {
    expect(component).toBeTruthy();
  });
});
