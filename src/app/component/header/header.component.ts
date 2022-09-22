import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthFail } from 'src/app/stores/authStore/authStore.actions';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {
  loginStatus$ = new Observable<boolean>()

  constructor(
    private authService : AuthService,
    private router : Router,
    private authStore : Store<{loginStatus: boolean}>
  ) { 
    this.loginStatus$ = authStore.select('loginStatus')
  }

  logout(): void {
    this.authService.logout()
    this.router.navigateByUrl('/login')
    this.authStore.dispatch(AuthFail())
  }
}
