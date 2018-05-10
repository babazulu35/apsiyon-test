import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class UserInterfaceService {
  toggleShow: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor() { }
  

  setShowStatus(flag:boolean) {
    this.toggleShow.next(flag);
  }
}
