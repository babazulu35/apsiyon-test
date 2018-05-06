import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'app-sort-item',
  templateUrl: './sort-item.component.html',
  styleUrls: ['./sort-item.component.scss']
})
export class SortItemComponent implements OnInit {
  @HostBinding('class.c-sort-item') true;
  @Input() icon:string;
  @Input() menuTitle:string;
  constructor() { }

  ngOnInit() {
  }

}
