import { Component } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';

import { LanguageService, TranslateService } from '@app/services';
import { TranslateDirective } from './translate.directive';


@Component({
  template: `
  <div id="base" appTranslate="code"></div>
  <div id="params" appTranslate="code" [appTranslateParams]="params"></div>
  <div id="dynamic" [appTranslate]="code" [appTranslateParams]="params"></div>
  `
})
class TestComponent {
  params = { param: 'value' };
  code = 'dynamicCode'
}

describe('TranslateDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  let languageService: Partial<LanguageService>;
  let translateService: Partial<TranslateService>;
  let language$: BehaviorSubject<string>;

  beforeEach(async () => {
    language$ = new BehaviorSubject('en');
    languageService = jasmine.createSpyObj('LanguageService', ['getLanguage']);
    (languageService.getLanguage as jasmine.Spy).and.returnValue(language$.asObservable());
    translateService = jasmine.createSpyObj('TranslateService', ['translate']);
    (translateService.translate as jasmine.Spy).and.callFake((str, lang, params?) =>
      `TR(${ lang })[${ params ? params.param : '' }]: ${ str }`);

    await TestBed.configureTestingModule({
      declarations: [
        TranslateDirective,
        TestComponent
      ],
      providers: [
        { provide: LanguageService, useValue: languageService },
        { provide: TranslateService, useValue: translateService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('initializes', () => {
    expect(component).toBeTruthy();
  });

  it('translates basic messages', () => {
    const div = fixture.debugElement.query(By.css('#base')).nativeElement;
    expect(div.innerHTML).toBe('TR(en)[]: code');
  });

  it('translates messages with params', () => {
    const div = fixture.debugElement.query(By.css('#params')).nativeElement;
    expect(div.innerHTML).toBe('TR(en)[value]: code');
  });

  it('reacts to translation code changes', () => {
    const div = fixture.debugElement.query(By.css('#dynamic')).nativeElement;
    expect(div.innerHTML).toBe('TR(en)[value]: dynamicCode');

    component.code = 'newCode';
    fixture.detectChanges();
    expect(div.innerHTML).toBe('TR(en)[value]: newCode');
  });

  it('reacts to translation parameters changes', () => {
    const div = fixture.debugElement.query(By.css('#dynamic')).nativeElement;
    expect(div.innerHTML).toBe('TR(en)[value]: dynamicCode');

    component.params = { param: 'newValue' };
    fixture.detectChanges();
    expect(div.innerHTML).toBe('TR(en)[newValue]: dynamicCode');
  });

  it('reacts to translation code and parameters changes', () => {
    const div = fixture.debugElement.query(By.css('#dynamic')).nativeElement;
    expect(div.innerHTML).toBe('TR(en)[value]: dynamicCode');

    component.code = 'newCode';
    component.params = { param: 'newValue' };
    fixture.detectChanges();
    expect(div.innerHTML).toBe('TR(en)[newValue]: newCode');
  });

  it('reacts to language changes', () => {
    const div = fixture.debugElement.query(By.css('#base')).nativeElement;
    expect(div.innerHTML).toBe('TR(en)[]: code');

    language$.next('fr');
    fixture.detectChanges();
    expect(div.innerHTML).toBe('TR(fr)[]: code');
  });
});