import { Component } from '@angular/core';

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss']
})
export class ContentLayoutComponent {

  onLocaleChange(locale: string) {
    if (!locale || !locale.length) {
      window.location.href = '/';
    } else {
      window.location.href = `/${locale}/`;
    }
  }

}
