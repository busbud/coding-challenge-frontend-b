import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CurrencyService, LanguageService } from '@app/services';
import { Option } from '@app/shared/models';
import { of } from 'rxjs';
import { HeaderComponent } from './header.component';



@Component({ selector: 'app-dropdown-selector' })
class DropdownSelectorComponentMock {
  @Input() options: Option[] = [];
  @Input() selectedValue: string | null;
  @Input() style: string = 'normal';
  @Output() optionSelected: EventEmitter<any> = new EventEmitter();
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let languageSelector: DropdownSelectorComponentMock;
  let currencySelector: DropdownSelectorComponentMock;

  let languageService: Partial<LanguageService>;
  let currencyService: Partial<CurrencyService>;
  let languageOptions: Option[];
  let currencyOptions: Option[];

  beforeEach(async () => {
    languageOptions = [ { label: 'English', value: 'en' } ];
    languageService = jasmine.createSpyObj('LanguageService', ['getLanguage', 'getLanguageOptions', 'setLanguage']);
    (languageService.getLanguage as jasmine.Spy).and.returnValue(of('en'));
    (languageService.getLanguageOptions as jasmine.Spy).and.returnValue(languageOptions);
    currencyOptions = [ { label: '$', value: 'USD' } ];
    currencyService = jasmine.createSpyObj('CurrencyService', ['getCurrency', 'getCurrencyOptions', 'setCurrency']);
    (currencyService.getCurrency as jasmine.Spy).and.returnValue(of('USD'));
    (currencyService.getCurrencyOptions as jasmine.Spy).and.returnValue(currencyOptions);

    await TestBed.configureTestingModule({
      declarations: [
        HeaderComponent,
        DropdownSelectorComponentMock
      ],
      providers: [
        { provide: LanguageService, useValue: languageService },
        { provide: CurrencyService, useValue: currencyService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    [languageSelector, currencySelector] = fixture.debugElement
      .queryAll(By.directive(DropdownSelectorComponentMock))
      .map(de => de.componentInstance);
  });

  it('initializes', () => {
    expect(component).toBeTruthy();
  });

  it('properly stores options', () => {
    expect(component.languages).toBe(languageOptions);
    expect(component.currencies).toBe(currencyOptions);
  });

  it('initializes the language selector', () => {
    expect(languageSelector.options).toBe(languageOptions);
    expect(languageSelector.selectedValue).toBe('en');
    expect(languageSelector.style).toBe('normal');
  });

  it('propagates language selections', () => {
    languageSelector.optionSelected.emit('fr');
    
    expect(languageService.setLanguage).toHaveBeenCalledOnceWith('fr');
  });

  it('initializes the currency selector', () => {
    expect(currencySelector.options).toBe(currencyOptions);
    expect(currencySelector.selectedValue).toBe('USD');
    expect(currencySelector.style).toBe('short');
  });

  it('propagates currency selections', () => {
    currencySelector.optionSelected.emit('CA$');
    
    expect(currencyService.setCurrency).toHaveBeenCalledOnceWith('CA$');
  });

});
