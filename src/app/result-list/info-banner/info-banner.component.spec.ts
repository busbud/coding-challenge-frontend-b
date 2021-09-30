import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { InfoBannerComponent } from './info-banner.component';


describe('InfoBannerComponent', () => {
  let component: InfoBannerComponent;
  let fixture: ComponentFixture<InfoBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        InfoBannerComponent
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('initializes', () => {
    expect(component).toBeTruthy();
  });

  it('displays loading banner', () => {
    component.type = 'loading';
    fixture.detectChanges();
    const bannerList = fixture.debugElement.queryAll(By.css('.banner'));
    const spinner = fixture.debugElement.query(By.css('.banner.loading .spinner-border .sr-only')).nativeElement;
    const tittle = fixture.debugElement.query(By.css('.banner.loading .title')).nativeElement;

    expect(bannerList.length).toBe(1);
    expect(spinner.getAttribute('appTranslate')).toBe('info.loading.spinner-message');
    expect(tittle.getAttribute('appTranslate')).toBe('info.loading.title');
  });

  it('displays no-departures banner', () => {
    component.type = 'noDepartures';
    fixture.detectChanges();
    const bannerList = fixture.debugElement.queryAll(By.css('.banner'));
    const img = fixture.debugElement.query(By.css('.banner.no-departures .title-group .empty-icon')).nativeElement;
    const tittle = fixture.debugElement.query(By.css('.banner.no-departures .title-group .title')).nativeElement;
    const subtittle = fixture.debugElement.query(By.css('.banner.no-departures .subtitle')).nativeElement;

    expect(bannerList.length).toBe(1);
    expect(img.getAttribute('src')).toBe('/assets/empty.svg');
    expect(tittle.getAttribute('appTranslate')).toBe('info.no-departures.title');
    expect(subtittle.getAttribute('appTranslate')).toBe('info.no-departures.subtitle');
  });

  it('displays error banner', () => {
    component.type = 'error';
    fixture.detectChanges();
    const bannerList = fixture.debugElement.queryAll(By.css('.banner'));
    const img = fixture.debugElement.query(By.css('.banner.error .error-icon')).nativeElement;
    const tittle = fixture.debugElement.query(By.css('.banner.error .title')).nativeElement;

    expect(bannerList.length).toBe(1);
    expect(img.getAttribute('src')).toBe('/assets/warning.svg');
    expect(tittle.getAttribute('appTranslate')).toBe('info.error.title');
  });
});
