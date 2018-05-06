import { Movies } from './models/movies';
import { Component, HostBinding } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { HttpService } from './services/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:[HttpService]
})
export class AppComponent implements OnInit {
  @HostBinding('class.app-main') true;
  title = 'app';
  movies: Movies[];
  isDisable = [];

  constructor(private httpService:HttpService) {

  }

  ngOnInit() {
    // Get All Movie List
    this.httpService.getAllList().subscribe(movieList => {
      this.movies = movieList
     }); 

     // Countet Value 
     this.httpService.count.subscribe(countResult => {
       console.log("Count REsult",countResult);
     })
      

  }
  
  // Create New Movie
  createNewMovie() {
    this.httpService.postNew(<Movies>{title:"Hakans",rank:"5"}).subscribe(result=> {

      if(result) {
        console.log("Creation Success",result);
      }
    },error => {
      console.log("Error Message",error);
    });     
  }

  // Rank Update
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
        return this.movies[finded].rank = patchResult.rank;
      })  
  }

  sortByRank() {
     // Sort By Result 
     this.httpService.sortBy({value:'rank',type:'asc'}).subscribe(sortResult => {
      this.movies = sortResult; 
   });    
  }

  sortByName() {
         // Sort By Result 
         this.httpService.sortBy({value:'title',type:'asc'}).subscribe(sortResult => {
          this.movies = sortResult; 
       });
  }
  
}
