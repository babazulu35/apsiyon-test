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

  @HostBinding('class.apsiyon-blue') isThemeBlue;

  @HostBinding('class.apsiyon-gray') isThemeGray;

  @HostBinding('class.default') isThemeDefault;
  

  constructor(private httpService:HttpService,private route:ActivatedRoute,private uiService:UserInterfaceService) {

  }

  ngOnInit() {
    // Get All Movie List
    this.uiService.changeTheme.subscribe(theme => {
      console.log("Theme",theme);
      switch(theme) {
          case 0:

              this.resetTheme();
              this.isThemeDefault = true;
          break;
          case 1:
            this.resetTheme();
            this.isThemeGray = true;
          break;
          case 2:
            this.resetTheme();
            this.isThemeBlue = true;
          break;
          default:
            this.resetTheme();
            this.isThemeDefault = true;
      }
    })
  }

  resetTheme() {
    this.isThemeBlue = false;
    this.isThemeDefault = false;
    this.isThemeGray = false;
  }

  // Create New Movie


  // Rank Update





  
}
