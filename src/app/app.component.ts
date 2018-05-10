import { UserInterfaceService } from './services/user-interface.service';
import { Movies } from './models/movies';
import { Component, HostBinding } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { HttpService } from './services/http.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:[HttpService,UserInterfaceService]
})
export class AppComponent implements OnInit {

  title = 'app';
  movies: Movies[];
  

  constructor(private httpService:HttpService,private route:ActivatedRoute,private uiService:UserInterfaceService) {

  }

  ngOnInit() {
    // Get All Movie List

  }
  
  // Create New Movie


  // Rank Update





  
}
