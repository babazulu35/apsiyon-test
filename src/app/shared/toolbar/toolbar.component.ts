import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @HostBinding('class.s-toolbar') true;
  constructor() { }

  ngOnInit() {
  }

}
