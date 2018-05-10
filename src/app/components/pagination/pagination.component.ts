import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, Inject, Input } from '@angular/core';
import { HttpService } from '../../services/http.service';
import * as fromRoot from '../../app.reducer';
import * as PAGINATION from '../../actions/pagination.actions';
import * as Movie from '../../actions/movie.actions';
import * as UI from '../../actions/ui.actions';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  
  @Input() pageLimit:number;
  pages:number[] = [];
  totalItem:number;
  currentPage$:Observable<number>;
  constructor(private httpService:HttpService,private store:Store<fromRoot.State>) { }

  ngOnInit() {
    this.httpService.pageLimit.next(this.pageLimit);
    this.currentPage$ = this.store.select(fromRoot.getCurrentPage);
    
    this.store.select(fromRoot.getCurrentPage).subscribe(result => {
      this.httpService.paginate({page:result,limit:this.pageLimit}).subscribe(pageResult => {

        this.store.dispatch(new Movie.GetMovies(pageResult));
      })
    })

    this.httpService.count.subscribe(countResult => {
      this.pages = [];
      this.totalItem = Math.ceil(countResult / this.pageLimit);
      for(let i = 0 ; i < this.totalItem; i++) {
        this.pages.push(i + 1);
      }
    } );
    
  }

  onPageChange(page:number,currentPage) {
    let Cpage;
    this.currentPage$.subscribe(result => Cpage = result);
    // to stop empty request call
    if(page != Cpage)
    {
      this.store.dispatch(new UI.StartLoading());
      this.store.dispatch(new PAGINATION.ShowSelectedPage(page));
    }
  }

  onGo(direction:string) {
    switch(direction) {
      case 'next':
        this.store.dispatch(new UI.StartLoading());
        this.store.dispatch(new PAGINATION.ShowNextPage({totalPageSize:this.totalItem}));
      break;
      case 'prev':
      
        this.store.dispatch(new PAGINATION.ShowPreviousPage());
      break;
    }
  }

  

}
