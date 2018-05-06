import { Movies } from './../../models/movies';
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  movies: Movies[];
  isDisable = [];
  constructor(private httpService:HttpService) { }

  ngOnInit() {
    this.httpService.movieSubject.subscribe(movieList => {
      this.movies = movieList
    })
    this.httpService.getAllList().subscribe(movieList => {
      this.httpService.movieSubject.next(movieList);
     }); 

     // Countet Value 
     this.httpService.count.subscribe(countResult => {
       console.log("Count REsult",countResult);
     })
  }

  updateRank(action,params:{}) {
    let newRank;

    switch(action) {
      case "increase":
      newRank  = parseInt(params['rank']) + 1 ;
      
      break;
      case "decrease":

      newRank  = parseInt(params['rank']) - 1 ;
      if(newRank <= 0) { newRank = 0; this.isDisable[params['id']] = true; }
      break; 
    }

    this.httpService.patchData(<Movies>{id:params['id'],rank: newRank.toString()}).subscribe(patchResult => {
      let finded = this.movies.findIndex(result => result.id == params['id'] );
      this.movies[finded].rank = patchResult.rank;
      this.httpService.movieSubject.next(this.movies);
      
    })  
}

}
