import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tylr-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = 'Angular4 works!';
  constructor() { }

  ngOnInit() {
  }

}