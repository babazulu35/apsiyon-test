
import { Observable } from 'rxjs/Observable';
import { Movies } from './../models/movies';
import { Injectable } from '@angular/core';
import {environment as Env} from './../../environments/environment';
import {BehaviorSubject} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import * as UI from '../actions/ui.actions';
import * as Movie from '../actions/movie.actions';
import * as Pagination from '../actions/pagination.actions';
import { HttpParams } from '@angular/common/http';
@Injectable()
export class HttpService {
  
  // Get API Url from Env.
  apiUrl:string = Env.api.mock;
  endPoint:string = "/movies";
  count: BehaviorSubject<number> = new BehaviorSubject(0);
  movieSubject: BehaviorSubject<Movies[]> = new BehaviorSubject([]);
  pageLimit:BehaviorSubject<number> = new BehaviorSubject(0);

  isFiltered:BehaviorSubject<Object> = new BehaviorSubject({});
  isSorted:BehaviorSubject<Object> = new BehaviorSubject({});

  constructor(
    private http:HttpClient,
    private store: Store<fromRoot.State>,
  
  ) { 

    this.getAllList().subscribe(totalData => {
      console.log("total datas",totalData.length),
      this.count.next(totalData.length);
      this.store.dispatch(new UI.StartLoading());
    },error => {
      this.store.dispatch(new UI.StopLoading());
    })
  }

  refreshState(){
    this.http.get<Movies[]>(this.apiUrl + this.endPoint).subscribe(result => {
        if(result) {
          this.store.dispatch(new Movie.GetMovies(result));
        }
    })
  }
  
  // Get All Movie List
  getAllList(params?:any):Observable<Movies[]> {
    return this.http.get<Movies[]>(this.apiUrl + this.endPoint);
  }  
  // Get List element by Id
  getById(id:string) {
    this.http.get<Movies>(this.apiUrl + this.endPoint + '/' + id ).subscribe(movieById => {
      console.log("Movie By Id",movieById);
    })
  }

  postNew(data:Movies):Observable<Movies> {
    let id = this.generateRandomUniqueID();
    data.id = id;
    return this.http.post<Movies>(this.apiUrl + this.endPoint,data) ;
  }

  update(data:Movies):Observable<Movies> {
    return ;
  }

  patchData(data:Movies):Observable<Movies> {
    return this.http.patch<Movies>(this.apiUrl + this.endPoint + '/' + data.id,data);
  }

  deleteData(id):Observable<Movies> {
    return this.http.delete<Movies>(this.apiUrl + this.endPoint + '/' + id);
  }

  paginate(paginate:{page:any,limit:any}):Observable<Movies[]> {
    let parms;
    let params = new HttpParams().set('_page',paginate.page).set('_limit',paginate.limit);
    this.isFiltered.subscribe(filterParams => {
      if(Object.keys(filterParams).length > 0) {
          params = params.append('type',filterParams['value']);
         
      } 
    });
    this.isSorted.subscribe(sortParams => {
      if(Object.keys(sortParams).length >0) {
        params = params.append('_sort',sortParams['value']).append('_order',sortParams['type']);
      }
    })
    return this.http.get<Movies[]>(this.apiUrl + this.endPoint,{params});
  }

  generateRandomUniqueID(length : number = 6){
    return 'x'.repeat(length).replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });
  }

  filterItem(filterParams:any) {
    this.isFiltered.next(filterParams);
  }

  sortItem(sortParams:any) {
    this.isSorted.next(sortParams);
  }

  sortBy(sort:{value:string,type:string}):Observable<Movies[]> {
    this.store.dispatch(new Pagination.FlushPagination());
    let limit = 0;
    this.pageLimit.subscribe(result => limit = result)
    this.sortItem(sort);
    return this.http.get<Movies[]>(this.apiUrl + this.endPoint,{params:{'_sort':sort.value,'_order':sort.type,'_page':'1','_limit':limit.toString()}})
  }

  filterByType(filter:{value:string}) {
    this.store.dispatch(new Pagination.FlushPagination());
    let limit = 0;
    let params;
    console.log(filter);
    filter.value != null ? params = new HttpParams().set('type',filter.value) : params = new HttpParams().set('*','*');
    this.pageLimit.subscribe(result => limit = result);
    if(filter.value != null) this.filterItem(filter);
    this.http.get<Movies[]>(this.apiUrl + this.endPoint,{params}).subscribe(filterResult => {
        this.store.dispatch(new UI.StartLoading());
        this.count.next(filterResult.length);
        this.paginate({page:'1',limit:limit}).subscribe(result => {
          this.store.dispatch(new Movie.SortType(result));
        });

    });
  }



}
