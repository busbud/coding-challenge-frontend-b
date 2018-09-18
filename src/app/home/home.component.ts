import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // today : any;
  searchResults: any;
  constructor(private homeService: HomeService) { }

  ngOnInit() {
    this.getDate();
  }

  getDate(){
   const today = new Date('August 19, 2018 00:00:00');
   today.setDate(2);
  return today.toISOString();
  }

  onClickSearch(): void {
    this.homeService.getData(this.getDate()).subscribe(res => {
      console.log(res);
      this.searchResults = res;
    });
  }
}
