import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChildToParentService } from 'src/app/services/child-to-parent.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ProfileData } from 'src/app/model/profile-data';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  loginReq = new Subscription()
  getLoginStatus : boolean = false
  loginStatus : boolean = false
  data : ProfileData = {
    name: '',
    jobs: [],
    photos: [],
    articles: [],
    videos: []
  }
  roundCornerClass : string[] = ['rc-tl', 'rc-tr', 'rc-bl', 'rc-br']
  constructor(
    private ctpService : ChildToParentService,
    private client : HttpClient
  ) { }

  ngOnInit(): void {
    this.loginReq = this.ctpService.loginStatus$.subscribe(($event) => {
      this.loginStatus = $event
      this.getLoginStatus = true
      if ($event === true) {
        this.client.get<any>('http://localhost:8000/users/profile').subscribe({
          next: (response) => { 
            this.data = response.data
            console.log(this.data)
          },
          error: () => {},
          complete: () => {}
        });
      }
    })
    this.ctpService.requestLogin$.next('Request login status from profile route')
  }

  ngOnDestroy(): void {
    if (this.loginReq) {
      this.loginReq.unsubscribe()
    }
  }

  formatUrl(url:string) : string{
    return url.replace("watch?v=", "embed/")
  }
}
