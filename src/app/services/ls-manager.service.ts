import { Injectable } from '@angular/core';
import { User } from '../model/user';
@Injectable({
  providedIn: 'root'
})
export class LSManagerService {
  constructor() { }

  getAccountList(){
    return JSON.parse(localStorage.getItem("account-list") || "[]")
  }
  saveToLS(accountList:User[]){
    localStorage.setItem("account-list", JSON.stringify(accountList));
  }
}