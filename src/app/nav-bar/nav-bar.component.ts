import { Component, OnInit} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

//  @Input() changeLang: any;

 constructor(private translate: TranslateService){
  translate.setDefaultLang('en');
}

  ngOnInit() {
  }

  // changeLanguage() {
  //   this.translate
  // }
  useLanguage(language: string) {
    this.translate.use(language);
}
}
