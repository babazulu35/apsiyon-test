import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @HostBinding('class.s-toolbar') true;
  @HostBinding('class.mat-toolbar') isToolbar:boolean;
  @HostBinding('class.mat-primary') isPrimary:boolean;
  constructor(private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.isToolbar = true;
    this.isPrimary = true;
    
  }
  

}
