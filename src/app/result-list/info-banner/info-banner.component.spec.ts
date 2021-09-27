import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoBannerComponent } from './info-banner.component';

describe('InfoBannerComponent', () => {
  let component: InfoBannerComponent;
  let fixture: ComponentFixture<InfoBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
