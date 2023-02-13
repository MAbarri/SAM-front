import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-convos',
  templateUrl: './convos.component.html',
  styleUrls: ['./convos.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ConvosComponent implements OnInit {

  constructor() {
    document.body.className = "body-style-convs";
  }

  ngOnDestroy() {
    document.body.className = "";
  }
  ngOnInit(): void {
  }

}
