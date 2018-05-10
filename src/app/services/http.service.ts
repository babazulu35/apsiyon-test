
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
@Injectable()
export class HttpService {
  
  // Get API Url from Env.
  apiUrl:string = Env.api.mock;
  endPoint:string = "/movies";
  count: BehaviorSubject<number> = new BehaviorSubject(0);
  movieSubject: BehaviorSubject<Movies[]> = new BehaviorSubject([]);

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
    this.isFiltered.subscribe(filterParams => {
      console.log("Filter Params",filterParams);
    })
    return this.http.get<Movies[]>(this.apiUrl + this.endPoint,{params:{'_page':paginate.page,'_limit':paginate.limit,'_sort':'rate','order':'asc'}})
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
    
    return this.http.get<Movies[]>(this.apiUrl + this.endPoint,{params:{'_sort':sort.value,'_order':sort.type}})
  }

  filterByType(filter:{value:string}):Observable<Movies[]> {
    return this.http.get<Movies[]>(this.apiUrl + this.endPoint,{params:{'type':filter.value}});
  }



}
