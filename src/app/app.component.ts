import { Component, OnInit} from '@angular/core';
import { AuthService } from './services/auth.service';
import { AuthSuccess, AuthFail } from './stores/authStore/authStore.actions';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'members-manager';
  
  loginStatus$ = new Observable<boolean>()

  constructor(
    private authService : AuthService,
    private authStore : Store<{loginStatus : boolean}>,
    private router : Router
  ) {
    this.loginStatus$ = authStore.select('loginStatus')
  }

  ngOnInit(): void{
    this.authService.isLoggedIn().subscribe({
      next: (e : boolean) => {
        if (e) {
          this.authStore.dispatch(AuthSuccess())
        } else {
          this.authStore.dispatch(AuthFail())
          this.router.navigateByUrl('/login')
        }
      },
      error: () => { 
        this.authStore.dispatch(AuthFail())
        this.router.navigateByUrl('/login')
      },
      complete: () => { }
    })
  }
}
