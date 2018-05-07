
import { Observable } from 'rxjs/Observable';
import { Movies } from './../models/movies';
import { Injectable } from '@angular/core';
import {environment as Env} from './../../environments/environment';
import {BehaviorSubject} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import * as UI from '../actions/ui.actions'
@Injectable()
export class HttpService {
  
  // Get API Url from Env.
  apiUrl:string = Env.api.mock;
  endPoint:string = "/movies";
  count: BehaviorSubject<number> = new BehaviorSubject(0);
  movieSubject: BehaviorSubject<Movies[]> = new BehaviorSubject([]);

  constructor(
    private http:HttpClient,
    private store: Store<fromRoot.State>,
  
  ) { 

    this.getAllList().subscribe(totalData => {
      this.count.next(totalData.length);
      this.store.dispatch(new UI.StartLoading());
    },error => {
      this.store.dispatch(new UI.StopLoading());
    })
  }
  
  // Get All Movie List
  getAllList():Observable<Movies[]> {
    return this.http.get<Movies[]>(this.apiUrl + this.endPoint);
  }  
  // Get List element by Id
  getById(id:string) {
    this.http.get<Movies>(this.apiUrl + this.endPoint + '/' + id ).subscribe(movieById => {
      console.log("Movie By Id",movieById);
    })
  }

  postNew(data:Movies):Observable<Movies> {
    let id = this.createRandomId(data.id);
    data.id = id;
    return this.http.post<Movies>(this.apiUrl + this.endPoint,data);
  }

  update(data:Movies):Observable<Movies> {
    return ;
  }

  patchData(data:Movies):Observable<Movies> {
    return this.http.patch<Movies>(this.apiUrl + this.endPoint + '/' + data.id,data);
  }

/*   deleteData(data:Movies):Observable<Movies> {
    return this.http.delete<Movies>(this.apiUrl + this.endPoint + '/' + data.id,data);
  } */

  paginate():Observable<Movies[]> {
    return this.http.get<Movies[]>(this.apiUrl + this.endPoint)
  }

  createRandomId(value:string) {
      //TODO Create Random Id
      return "tt1234567";
  }

  sortBy(sort:{value:string,type:string}):Observable<Movies[]> {
    return this.http.get<Movies[]>(this.apiUrl + this.endPoint,{params:{'_sort':sort.value,'order':sort.type}})
  }



}
