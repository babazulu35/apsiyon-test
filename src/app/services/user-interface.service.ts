import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class UserInterfaceService {
  toggleShow: BehaviorSubject<boolean> = new BehaviorSubject(false);
  changeTheme: BehaviorSubject<number> = new BehaviorSubject(null);
  constructor() { }
  

  setShowStatus(flag:boolean) {
    this.toggleShow.next(flag);
  }

  setTheme(themeNumber:number) {
    this.changeTheme.next(themeNumber);
  }
}
