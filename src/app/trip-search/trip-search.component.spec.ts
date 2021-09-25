import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripSearchComponent } from './trip-search.component';

describe('TripSearchComponent', () => {
  let component: TripSearchComponent;
  let fixture: ComponentFixture<TripSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TripSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
