import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgeSelectorComponent } from './age-selector.component';

describe('AgeSelectorComponent', () => {
  let component: AgeSelectorComponent;
  let fixture: ComponentFixture<AgeSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgeSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
