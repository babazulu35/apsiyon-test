


import { Movies } from './../../models/movies';
import { Component, OnInit,Inject } from '@angular/core';
import { HttpService } from '../../services/http.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { PaginationComponent } from './../pagination/pagination.component';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import * as UI from '../../actions/ui.actions';
import * as Rank from '../../actions/rank.actions';
import { Observable } from 'rxjs/Observable';
//import { map } from 'rxjs/operators';
import  "rxjs/add/operator/map";

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
  entryComponents:[PaginationComponent]
  
})
export class ItemListComponent implements OnInit {
  movies: Movies[];
  isDisable = [];
  isLoading$:Observable<boolean>;
  rate$: Observable<number>;
  number;
  constructor(
    private httpService:HttpService,
    public dialog: MatDialog,
    private store: Store<fromRoot.State>)
  { }

  ngOnInit() {
    
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);

    this.store.select(fromRoot.getRank).subscribe(result => {
      this.number = result;
    });
      
    
    this.httpService.movieSubject.subscribe(movieList => {
      this.movies = movieList
      
    })
    this.httpService.getAllList().subscribe(movieList => {
      if(movieList) {
        setTimeout(() => {
          this.store.dispatch(new UI.StopLoading());
        },5000)
        
      }
      this.httpService.movieSubject.next(movieList);
     }); 

     // Countet Value 
     this.httpService.count.subscribe(countResult => {
       console.log("Count REsult",countResult);
     })
  }
  openDialog(): void {
    let dialogRef = this.dialog.open(PaginationComponent, {
      width: '50vw',
      height:'500px',
      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);
    
    });
  }
  updateRank(action,params:{}) {
    let newRank;

    switch(action) {
      case "increase":
      
      this.store.dispatch(new Rank.IncreaseRank(parseInt(params['rank'])));
      break;
      case "decrease":
      this.store.dispatch(new Rank.DecreaseRank(parseInt(params['rank'])));
      
      if(newRank <= 0) { newRank = 0; this.isDisable[params['id']] = true; }
      break; 
    }

    this.httpService.patchData(<Movies>{id:params['id'],rank: this.number.toString()}).subscribe(patchResult => {
      let finded = this.movies.findIndex(result => result.id == params['id'] );
      // TODO: patch Result da geleni yeni oluşturacağım Movies Reducerine Geçeceğiz
      this.movies[finded].rank = patchResult.rank;
      this.store.dispatch(new Rank.CurrentRank(parseInt(patchResult.rank)));
      //this.httpService.movieSubject.next(this.movies);
      
    })  
}

}
