import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DurationIndicatorComponent } from './duration-indicator.component';

describe('DurationIndicatorComponent', () => {
  let component: DurationIndicatorComponent;
  let fixture: ComponentFixture<DurationIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DurationIndicatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DurationIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
