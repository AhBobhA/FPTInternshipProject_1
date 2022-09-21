import { Injectable } from '@angular/core';
import { JwtToken } from '../model/jwt-token';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor() { }
  setLocalStorage(responseObj : JwtToken) {

    // Adds the expiration time defined on the JWT to the current moment
    //const expiresAt = moment().add(Number.parseInt(responseObj.expiresIn), 'days');

    localStorage.setItem('token', responseObj.token);
    //localStorage.setItem("expires", JSON.stringify(expiresAt.valueOf()) );
}          

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("expires");
  }

  public isLoggedIn() {
    //return moment().isBefore(this.getExpiration(), "second");
  }

  isLoggedOut() {
    //return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires");
    if (expiration) {
      const expiresAt = JSON.parse(expiration);
      //return moment(expiresAt);
    } else {
      //return moment();
    }
  }    
}
