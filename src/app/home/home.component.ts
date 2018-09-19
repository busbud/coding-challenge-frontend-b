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
  poll: any;

  constructor(private homeService: HomeService) { }

  ngOnInit() {
    this.enablePolling();
  }

  enablePolling() {
  this.poll = setInterval(this.onClickSearch, 1000);
  console.log(this.poll);

  }

  onClickSearch(): void {
    this.homeService.getData().subscribe(res => {
      this.searchResults = res;
      console.log(this.searchResults);
    });
  }
}


