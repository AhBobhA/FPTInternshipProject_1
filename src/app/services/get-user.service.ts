import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetUserService {

  constructor(
    private client: HttpClient
  ) { }

  getProfile() : any {
    return this.client.get<any>('http://localhost:8000/users/profile')
  }

  
}
