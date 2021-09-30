import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';

import { LanguageService, TranslateService } from '@app/services';
import { DropdownSelectorComponent } from './dropdown-selector.component';
import { TranslateDirective } from '..';
import { By } from '@angular/platform-browser';


describe('DropdownSelectorComponent', () => {
  let component: DropdownSelectorComponent;
  let fixture: ComponentFixture<DropdownSelectorComponent>;

  let languageService: Partial<LanguageService>;
  let translateService: Partial<TranslateService>;

  beforeEach(async () => {
    languageService = jasmine.createSpyObj('LanguageService', ['getLanguage']);
    (languageService.getLanguage as any).and.returnValue(of('en'));
    translateService = jasmine.createSpyObj('TranslateService', ['translate']);
    (translateService.translate as any).and.callFake((str: string) => str);

    await TestBed.configureTestingModule({
      declarations: [
        DropdownSelectorComponent,
        TranslateDirective
      ],
      imports: [
        NgbModule
      ],
      providers: [
        { provider: LanguageService, useValue: languageService },
        { provider: TranslateService, useValue: translateService },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownSelectorComponent);
    component = fixture.componentInstance;
    component.options = [
      { label: 'label1', value: 'value1' },
      { label: 'label2', value: 'value2' },
      { label: 'label3', value: 'value3' }
    ]
    component.ngOnChanges({});
    fixture.detectChanges();
  });

  it('initializes', () => {
    expect(component).toBeTruthy();
  });

  it('renders the default class', () => {
    const container = fixture.debugElement.query(By.css('.d-inline-block')).nativeElement;

    expect(container.classList.contains('normal-style')).toBeTrue();
  });

  it('renders the received class', () => {
    component.style = 'short';
    fixture.detectChanges();
    const container = fixture.debugElement.query(By.css('.d-inline-block')).nativeElement;

    expect(container.classList.contains('short-style')).toBeTrue();
  });

  it('renders selector', () => {
    const selector = fixture.debugElement.query(By.css('button.selector')).nativeElement;

    expect(selector.innerText).toBe('label1');
  });

  it('renders options excluding the selected one', () => {
    const options = fixture.debugElement.queryAll(By.css('button.option-item')).map(de => de.nativeElement);

    expect(options.length).toBe(2);
    expect(options[0].innerText).toBe('label2');
    expect(options[1].innerText).toBe('label3');
  });

  it('reacts to option selection', () => {
    const option = fixture.debugElement.queryAll(By.css('button.option-item'))[0];
    spyOn(component.optionSelected, 'emit');

    option.triggerEventHandler('click', null);
    fixture.detectChanges();
    const selector = fixture.debugElement.query(By.css('button.selector')).nativeElement;
    const options = fixture.debugElement.queryAll(By.css('button.option-item')).map(de => de.nativeElement);

    expect(component.optionSelected.emit).toHaveBeenCalledOnceWith('value2');
    expect(selector.innerText).toBe('label2');
    expect(options[0].innerText).toBe('label1');
    expect(options[1].innerText).toBe('label3');
  });

  it('propagates full option object if needed', () => {
    component.emitFullOption = true;
    const option = fixture.debugElement.queryAll(By.css('button.option-item'))[0];
    spyOn(component.optionSelected, 'emit');

    option.triggerEventHandler('click', null);

    expect(component.optionSelected.emit).toHaveBeenCalledOnceWith({ label: 'label2', value: 'value2' });
  });
});
