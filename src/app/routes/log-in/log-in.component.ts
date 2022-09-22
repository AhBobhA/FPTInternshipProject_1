import { Component } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { JwtToken } from 'src/app/model/jwt-token';
import { Store } from '@ngrx/store'
import { AuthSuccess, AuthFail } from 'src/app/stores/authStore/authStore.actions';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})

export class LogInComponent{
  emailError : boolean = false
  passwordError : boolean = false
  loginFailed : boolean = false

  emailEMsg : string = ''
  passwordEMsg : string = ''
  loginFailedEMsg : string = ''

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<{ loginStatus: boolean}>
  ) {}

  onSubmit(form : NgForm) : void {
    let email = form.value.email
    let password = form.value.password

    if (!this.validateForm(email, password)) {
      return
    }

    const headers = new HttpHeaders({'Content-type': 'application/json'});

    const reqObject = {
      username: email,
      password: password
    };

    this.authService.login(reqObject, headers).subscribe({
      next: (responseObj : any) => {
        this.authService.setLocalStorage(responseObj as JwtToken)
        this.store.dispatch(AuthSuccess())
      },
      error: (error : any) => {
        console.log(error)
        this.loginFailed = true
        this.loginFailedEMsg = 'Login Failed'
        this.store.dispatch(AuthFail())
      },
      complete: () => {
        this.router.navigateByUrl('/profile')
      }
    });
  }

  validateForm(email:string, password:string) : boolean {
    let emailRegex = new RegExp(/\w+@+\w+\.+\w/)
    let errorTrig : boolean = false
    if (email.length === 0){
      this.emailError = true
      this.emailEMsg = 'Email is required'
      errorTrig = true
    } else {
      if (!email.match(emailRegex)) {
        this.emailError = true
        this.emailEMsg = 'Invalid email'
        errorTrig = true
      } else {
        this.emailError = false
      }
    }

    if (password.length === 0) {
      this.passwordError = true
      this.passwordEMsg = 'Password is required'
      errorTrig = true
    } else {
      this.passwordError = false
    }

    if (errorTrig === true) {
      return false
    }

    return true
  }
}
