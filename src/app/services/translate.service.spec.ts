import { TestBed } from '@angular/core/testing';

import { TranslateService } from './translate.service';


describe('TranslateService', () => {
  let service: TranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslateService);
    (service as any).translations = {
      en: {
        'simple.string': 'EN:SimpleString',
        'string.with.parameters': 'EN:The result of {num1} + {num2} is {total}'
      },
      fr: {
        'simple.string': 'FR:SimpleString',
        'string.with.parameters': 'FR:The result of {num1} + {num2} is {total}'
      }
    }
  });

  it('initializes', () => {
    expect(service).toBeTruthy();
  });

  describe('simple strings', () => {
    it('translates by language', () => {
      expect(service.translate('simple.string', 'en')).toBe('EN:SimpleString');
      expect(service.translate('simple.string', 'fr')).toBe('FR:SimpleString');
    });
  
    it('returns id if translation not found', () => {
      expect(service.translate('not.found.string', 'en')).toBe('not.found.string');
    });
  
    it('returns id if language set not found', () => {
      expect(service.translate('simple.string', 'es')).toBe('simple.string');
    });
  
    it('returns empty string if id not supplied', () => {
      expect(service.translate(undefined as any, 'en')).toBe('');
    });
  });

  describe('strings with parameters', () => {
    it('translates by language', () => {
      expect(service.translate('string.with.parameters', 'en', { num1: 3, num2: 2, total: 5 }))
        .toBe('EN:The result of 3 + 2 is 5');
      expect(service.translate('string.with.parameters', 'fr', { num1: 3, num2: 2, total: 5 }))
        .toBe('FR:The result of 3 + 2 is 5');
    });
  
    it('returns id if translation not found', () => {
      expect(service.translate('not.found.string', 'es', { num1: 3, num2: 2, total: 5 }))
        .toBe('not.found.string');
    });
  
    it('returns id if language set not found', () => {
      expect(service.translate('string.with.parameters', 'es', { num1: 3, num2: 2, total: 5 }))
        .toBe('string.with.parameters');
    });
  
    it('returns empty string if id not supplied', () => {
      expect(service.translate(undefined as any, 'en', { num1: 3, num2: 2, total: 5 })).toBe('');
    });
  });
});
