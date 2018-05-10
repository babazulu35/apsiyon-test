import { UserInterfaceService } from './../../services/user-interface.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-theme-change-component',
  templateUrl: './theme-change-component.component.html',
  styleUrls: ['./theme-change-component.component.scss']
})
export class ThemeChangeComponentComponent implements OnInit {
  isSelected = [];
  constructor(
    private uiService:UserInterfaceService
  ) { }

  ngOnInit() {
  }

  themeChangeHandler(event) {
      this.isSelected = [];
      this.isSelected[event.source.value] = true;
      this.uiService.setTheme(event.source.value);

  }
  inteChange(event) {
    console.log("Inte Change Enet",event);
  }

}
