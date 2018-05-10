import { Component, OnInit, HostBinding,AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserInterfaceService } from '../../services/user-interface.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],

})
export class ToolbarComponent implements OnInit,AfterViewInit {
  @HostBinding('class.s-toolbar') true;
  @HostBinding('class.mat-toolbar') isToolbar:boolean;
  @HostBinding('class.mat-primary') isPrimary:boolean;
  
  menuItemFilter:{change:number,name:string}[];
  menuItemSort:{change:number,name:string}[];
  showButton:boolean;
  constructor(
    private activatedRoute:ActivatedRoute,
    private ref: ChangeDetectorRef,
    private uiService: UserInterfaceService
  ) { 
    
  }

  ngOnInit() {
    this.isToolbar = true;
    this.isPrimary = true;
   
    this.uiService.toggleShow.subscribe(showButtonResult => {
      console.log("ShowBurr",showButtonResult);
      this.showButton = showButtonResult;
    })
    
  }

  ngAfterViewInit() {

    this.menuItemFilter = [{
      change:0,
      name:'Tümü'
    },
    {
      change:1,
      name:'Filmler'
    },
    {
      change:2,
      name:'Diziler'
    }

  ];
    this.menuItemSort = [
      {
        change:0,
        name:'Puana Göre (Artan)'
      },
      {
        change:1,
        name:'Puana Göre (Azalan)'
      }
  ];
    this.ref.detectChanges();
  
  }
  

}
