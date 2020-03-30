import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ethics',
  templateUrl: './ethics.component.html',
  styleUrls: ['./ethics.component.scss']
})
export class EthicsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  scroll(el: HTMLElement) {
    el.scrollIntoView({behavior:"smooth"});
}
}
