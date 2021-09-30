import { BrowserService } from './services/browser.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(
    browserService: BrowserService
  ) {
    browserService.detectLanguage();
  }
  
}
