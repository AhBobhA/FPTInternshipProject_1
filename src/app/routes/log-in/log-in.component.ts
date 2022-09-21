import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { JwtToken } from 'src/app/model/jwt-token';
import { ChildToParentService } from 'src/app/services/child-to-parent.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  emailError : boolean = false
  passwordError : boolean = false
  loginFailed : boolean = false

  emailEMsg : string = ''
  passwordEMsg : string = ''
  loginFailedEMsg : string = ''

  @Output() loginSuccess = new EventEmitter()

  constructor(
    private ctpService : ChildToParentService,
    private client: HttpClient, 
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.client.get<any>('http://localhost:8000/users/protected').subscribe({
      next: () => this.router.navigateByUrl('/'),
      error: () => {},
      complete: () => {}
    });
  }

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

    this.client.post('http://localhost:8000/users/login', reqObject, { headers: headers }).subscribe({
      next: (responseObj) => {
        this.authService.setLocalStorage(responseObj as JwtToken)
        this.ctpService.updateLogin$.next('login success')
      },
      error: (error) => {
        console.log(error)
        this.loginFailed = true
        this.loginFailedEMsg = 'Login Failed'
      },
      complete: () => {
        this.router.navigateByUrl('/')
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
