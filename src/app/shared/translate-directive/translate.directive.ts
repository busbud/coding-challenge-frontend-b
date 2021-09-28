import { LanguageService } from './../../services/language.service';
import { TranslateService } from './../../services/translate.service';
import { Directive, ElementRef, Input, OnInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription, combineLatest } from 'rxjs';

export type TranslationData = {
  id: string;
  params: { [key: string]: any }
}

@Directive({
  selector: '[appTranslate]'
})
export class TranslateDirective implements OnInit, OnChanges, OnDestroy {
  @Input('appTranslate') id: string;
  @Input('appTranslateParams') params: { [key:string]: any };
  private data$: BehaviorSubject<any> = new BehaviorSubject({});
  private subscriptions: Subscription[] = [];

  constructor(
    private el: ElementRef,
    private languageService: LanguageService,
    private translateService: TranslateService
  ) { }

  ngOnInit() {
    combineLatest([this.languageService.getLanguage(), this.data$.asObservable()])
      .subscribe(([lang, { id, params }]) => {
        this.el.nativeElement.innerHTML = this.translateService.translate(id, lang, params);
      });
  }

  ngOnDestroy(): void {
    // Prevent memory leaks
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  ngOnChanges({ id, params }: SimpleChanges) {
    this.data$.next({
      id: id && id.currentValue || this.data$.getValue().id,
      params: params && params.currentValue || this.data$.getValue().params
    });
  }

}
