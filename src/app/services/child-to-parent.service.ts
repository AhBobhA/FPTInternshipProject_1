import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChildToParentService {
  //Update the login status
  updateLogin$ = new Subject<any>()

  //Request the login status
  requestLogin$ = new Subject<any>()

  //The current login status
  loginStatus$ = new Subject<any>()

  constructor() { }
}
