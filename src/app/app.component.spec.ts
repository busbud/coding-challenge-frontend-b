import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { BrowserService } from './services/browser.service';


describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  let browserService: BrowserService;

  beforeEach(async () => {
    browserService = jasmine.createSpyObj('BrowserService', ['detectLanguage']);

    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: BrowserService, useValue: browserService }
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('initializes', () => {
    expect(app).toBeTruthy();
  });

  it('detects browser language', () => {
    expect(browserService.detectLanguage).toHaveBeenCalled();
  });
});
