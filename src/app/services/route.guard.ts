import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store'
import { AuthService } from './auth.service';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate {
  loginStatus$ = new Observable<boolean>()
  constructor(
    private authStore : Store<{loginStatus: boolean}>,
    private router : Router,
    private authService : AuthService
  ) {
    this.loginStatus$ = authStore.select('loginStatus')
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      return this.authService.isLoggedIn().pipe(
        map ((e : any) => {
          if (e.success) {
            return true
          } else {
            this.router.navigateByUrl('/login')
            return false
          }
        })
      )
  }
  
}
