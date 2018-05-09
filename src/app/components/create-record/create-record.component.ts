import { Movies } from './../../models/movies';
import { HttpService } from './../../services/http.service';
import { DialogMessageComponent } from './../dialog-message/dialog-message.component';
import { MatDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../app.reducer';
import * as Movie from '../../actions/movie.actions';

@Component({
  selector: 'app-create-record',
  templateUrl: './create-record.component.html',
  styleUrls: ['./create-record.component.scss']
})
export class CreateRecordComponent implements OnInit {
  name:string;
  rate:string;
  type:string;
  constructor(
    public dialog: MatDialog,
    public router:Router,
    private store:Store<fromRoot.State>,
    private httpService:HttpService
  ) { }
  
  isValid:boolean;
  ngOnInit() {
    this.isValid = false;
  }

  sendRecord() {
    this.httpService.postNew(<Movies>{id:"22233",title:this.name,type:this.type,rate:this.rate}).subscribe(onSave => {
      console.log("On Save This");
      if(onSave) {
        this.httpService.refreshState();
        let dialogRef = this.dialog.open(DialogMessageComponent, {
          width: '50vw',
          height:'500px',
          data:{title:'Kaydedildi',id:null,icon:'fas fa-6x fa-check',multiActions:false,next:'redirect'}
          
        });
    
        dialogRef.afterClosed().subscribe(result => {
          if(result == 'redirect') {
            this.router.navigate(['/']);
            console.log("Result",result);
          }
        });
      }
    })



  }

  typeCheckHandler(event) {
    console.log("Type Check ",event);
    this.type = "";
    switch(event.value) {
      case "1":
        this.type = "movies"
      break;

      case "2":
        this.type = "shows";
      break;
    }
  }

  valuechange(event) {
    this.isValid = true;
    this.name = "";
    this.name = event.target.value;
  }
  ratechange(event) {
    this.rate = "";
    this.rate = event.target.value;
  }

}
