import { Movies } from './../../models/movies';
import { HttpService } from './../../services/http.service';
import { DialogMessageComponent } from './../dialog-message/dialog-message.component';
import { MatDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../app.reducer';
import * as Movie from '../../actions/movie.actions';
import { ActivatedRoute } from '@angular/router';
import { UserInterfaceService } from '../../services/user-interface.service';

@Component({
  selector: 'app-create-record',
  templateUrl: './create-record.component.html',
  styleUrls: ['./create-record.component.scss']
})
export class CreateRecordComponent implements OnInit {
  name:string;
  rate:any;
  type:string;
  constructor(
    public dialog: MatDialog,
    public router:Router,
    private store:Store<fromRoot.State>,
    private httpService:HttpService,
    private route:ActivatedRoute,
    private uiService:UserInterfaceService
  ) { }
  
  isValid:boolean;
  ngOnInit() {
    this.isValid = false;

    if(this.route.snapshot.data['type'] == 'create') this.uiService.setShowStatus(true);
  }

  sendRecord() {
    let message;
    if(isNaN(this.rate) == true) {
        message = "Yanlış tip puan giriş olduğunda varsayılan 0 olarak kayıt edildi!";
        this.rate = 0;
    }
    else {
      message = "Kaydedildi";
      
    }
    console.log("this rante",this.rate);
    this.httpService.postNew(<Movies>{title:this.name,type:this.type,rate:this.rate}).subscribe(onSave => {
      if(onSave) {
        this.httpService.refreshState();
        let dialogRef = this.dialog.open(DialogMessageComponent, {
          width: '50vw',
          height:'500px',
          data:{title:message,id:null,icon:'fas fa-6x fa-check',multiActions:false,next:'redirect'}
          
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
    console.log(event.target.value);
    this.rate = "";
    this.rate = parseInt(event.target.value);
  }

}
