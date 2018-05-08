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
  typesOfList = ['Tümü', 'Filimler', 'Diziler'];
  constructor(private httpService:HttpService,private store:Store<fromRoot.State>) { }
  
  panelClass="hakan";
  ngOnInit() {
  
  } 

  onSelectionChange(event) {
    console.log("Selciton Change Event",event);
    this.sortByName();
  }
  onAreaListControlChanged(event) {
    console.log("Event",event);
  }

  sortByRank() {
    // Sort By Result 
    this.httpService.sortBy({value:'rank',type:'asc'}).subscribe(sortResult => {
      
      this.store.dispatch(new Movie.SortAscent(sortResult));
  });    
 }

 sortByName() {
        // Sort By Result 
        this.httpService.sortBy({value:'title',type:'asc'}).subscribe(sortResult => {
          this.store.dispatch(new UI.StartLoading());
          this.store.dispatch(new Movie.SortAscent(sortResult));
      });
 }

}
