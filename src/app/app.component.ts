import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChildToParentService } from './services/child-to-parent.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'members-manager';
  login : boolean = false

  loginSub = new Subscription()
  loginStatusReq = new Subscription()

  constructor(
    private client: HttpClient,
    private ctpService : ChildToParentService
  ) { }

  ngOnInit(): void {
    this.client.get<any>('http://localhost:8000/users/protected').subscribe({
      next: (response) => { 
        this.login = true
        this.ctpService.loginStatus$.next(this.login)
      },
      error: () => {},
      complete: () => {}
    })
    this.loginSub = this.ctpService.updateLogin$.subscribe(($event) => {
      if ($event === 'login success') {
        this.login = true
        this.ctpService.loginStatus$.next(this.login)
      }
    })
    this.loginStatusReq = this.ctpService.requestLogin$.subscribe(($event) => {
      console.log($event)
      console.log(this.login)
      this.ctpService.loginStatus$.next(this.login)
    })
  }

  ngOnDestroy(): void {
      if (this.loginSub) {
        this.loginSub.unsubscribe()
      }

      if (this.loginStatusReq) {
        this.loginStatusReq.unsubscribe()
      }
  }

  loginSuccess(){
    console.log('haha')
    this.login = true
  }

  logout() : void {
    this.login = false
  }
}
