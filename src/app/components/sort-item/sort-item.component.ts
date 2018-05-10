import { SortType } from './../../enum/sort-type.enum';
import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Store } from '@ngrx/store';

import * as Movie from '../../actions/movie.actions';
import * as UI from '../../actions/ui.actions';

import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-sort-item',
  templateUrl: './sort-item.component.html',
  styleUrls: ['./sort-item.component.scss']
})
export class SortItemComponent implements OnInit {
  @HostBinding('class.c-sort-item') true;
  @Input() icon:string;
  @Input() menuTitle:string;
  @Input() sortType:string;
  @Input() menuItem:{change:number,name:string};
  isSelected = [];
  constructor(private httpService:HttpService,private store:Store<fromRoot.State>) { }
  
  panelClass="menu-panel";

  ngOnInit() {

  } 

  onAreaListControlChanged(event) {
    this.isSelected = [];
    this.isSelected[event.change] = true;

    switch(event.change) {
      case 0:
      this.filterByType(null);
      break;
      case 1:
        this.filterByType('movie');
      break;
      case 2:
        this.filterByType('show');
      break;
    }

  }
 sortByName(value,type) {
        // Sort By Result 
        this.httpService.sortBy({value:value,type:type}).subscribe(sortResult => {
          this.store.dispatch(new UI.StartLoading());
          
          this.store.dispatch(new Movie.SortAscent(sortResult));
      });
 }

 onSortBy(event,changeType) {
      if(changeType == 0) {
        this.sortByName('rate','asc')
      }
      else if(changeType == 1) {
        this.sortByName('rate','desc');
      }

 }

 filterByType(typeName:string) {
     this.httpService.filterByType({value:typeName});
 }

}
