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

  title = 'app';
  movies: Movies[];
  

  constructor(private httpService:HttpService) {

  }

  ngOnInit() {
    // Get All Movie List

      

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





  
}
