import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  searchResults: any = {
    departures: []
  };
  constructor(private homeService: HomeService) { }

  ngOnInit() {
  }

  onClickSearch(): void {
    this.homeService.getData().subscribe(res => {
      this.searchResults = res;
      console.log(this.searchResults);
    });
  }
}


