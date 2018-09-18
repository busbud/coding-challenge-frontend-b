import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  search = false;
  constructor() { }

  ngOnInit() {
  }

  onClickSearch() {
    this.search = !this.search;
  }

}
