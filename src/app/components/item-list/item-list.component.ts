import { UserInterfaceService } from './../../services/user-interface.service';
import { RemoveMovie } from './../../actions/movie.actions';
import { DialogMessageComponent } from './../dialog-message/dialog-message.component';



import { Movies } from './../../models/movies';
import { Component, OnInit,Inject } from '@angular/core';
import { HttpService } from '../../services/http.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { PaginationComponent } from './../pagination/pagination.component';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import * as UI from '../../actions/ui.actions';
import * as Rate from '../../actions/rate.actions';
import * as Movie from '../../actions/movie.actions';
import { Observable } from 'rxjs/Observable';
//import { map } from 'rxjs/operators';
import  "rxjs/add/operator/map";

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
  
  
})
export class ItemListComponent implements OnInit {
  movies: Movies[];
  isDisable = [];
  isLoading$:Observable<boolean>;
  rate$: Observable<number>;
  movieList$:Observable<Movies[]>;
  number;
  constructor(
    private httpService:HttpService,
    public dialog: MatDialog,
    private store: Store<fromRoot.State>,
    private uiService: UserInterfaceService
    )
  { }

  ngOnInit() {
    
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.movieList$ = this.store.select(fromRoot.getMovie);

    this.uiService.setShowStatus(false);
 
    this.store.select(fromRoot.getMovie).subscribe(result => {
      if(result)
      {
        this.store.dispatch(new UI.StopLoading());
        console.log("Movie Result",result);
      }
    })
    this.store.select(fromRoot.getRate).subscribe(result => {
      this.number = result;
    });
    
  }
  openDialog(movie:Movies): void {
    let dialogRef = this.dialog.open(DialogMessageComponent, {
      width: '50vw',
      height:'500px',
      data:{title:movie.title + 'Silmek İstediğine Emin misin?',id:movie.id,icon:'far fa-5x fa-trash-alt',multiActions:true,next:null}
      
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.httpService.deleteData(result).subscribe(deleted => {
          this.store.dispatch(new Movie.RemoveMovie(result));
        })
      }
    });
  }
  updateRate(action,params:{}) {
    switch(action) {
      case "increase":   
      this.store.dispatch(new Rate.IncreaseRate(parseInt(params['rate'])));
      break;
      case "decrease":
      this.store.dispatch(new Rate.DecreaseRate(parseInt(params['rate'])));
      if(this.number <=0) this.isDisable[params['id']] = true;    
      break; 
    }

    this.httpService.patchData(<Movies>{id:params['id'],rate: this.number.toString()}).subscribe(patchResult => {
      this.store.dispatch(new Movie.UpdateMovieRate(patchResult));
      
    })  
}

}
