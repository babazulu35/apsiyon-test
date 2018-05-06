import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @HostBinding('class.s-toolbar') true;
  @HostBinding('class.mat-toolbar') isToolbar:boolean;
  @HostBinding('class.mat-primary') isPrimary:boolean;
  constructor() { }

  ngOnInit() {
    this.isToolbar = true;
    this.isPrimary = true;
  }

}
