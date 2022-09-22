import { Injectable } from '@angular/core'
import { JwtToken } from '../model/jwt-token'
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})

export class AuthService {
    constructor(
      private client : HttpClient,
    ) { }
      
    setLocalStorage(responseObj : JwtToken): void {
      // Adds the expiration time defined on the JWT to the current moment
      //const expiresAt = moment().add(Number.parseInt(responseObj.expiresIn), 'days');
      localStorage.setItem('token', responseObj.token);
      //localStorage.setItem("expires", JSON.stringify(expiresAt.valueOf()) );
    }   
           
    login(reqObject : object, headers: HttpHeaders) : any {
      return this.client.post<any>('http://localhost:8000/users/login', reqObject, { headers: headers })
    }

    logout(): void {
      localStorage.removeItem("token");
      localStorage.removeItem("expires");
    }

    isLoggedIn(): any {
      return this.client.get<any>('http://localhost:8000/users/protected')
    }

    /*isLoggedOut(): void {
      //return !this.isLoggedIn();
    } */

    /*getExpiration(): void {
      const expiration = localStorage.getItem("expires");
      if (expiration) {
        const expiresAt = JSON.parse(expiration);
        //return moment(expiresAt);
      } else {
        //return moment();
      }
    }   */  
}
