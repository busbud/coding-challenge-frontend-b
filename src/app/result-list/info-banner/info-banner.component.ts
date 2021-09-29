import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-info-banner',
  templateUrl: './info-banner.component.html',
  styleUrls: ['./info-banner.component.scss']
})
export class InfoBannerComponent {
  @Input() type: 'error'|'loading'|'noDepartures';
}
