import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { GetUserService } from 'src/app/services/get-user.service';
import { ProfileData } from 'src/app/model/profile-data';
import { Router } from '@angular/router'; 
import { Store } from '@ngrx/store'
import { AuthFail } from 'src/app/stores/authStore/authStore.actions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  getLoginStatus : boolean = false

  data : ProfileData = {
    name: '',
    jobs: [],
    photos: [],
    articles: [],
    videos: []
  }
  roundCornerClass : string[] = ['rc-tl', 'rc-tr', 'rc-bl', 'rc-br']
  constructor(
    private authService : AuthService,
    private userService : GetUserService,
    private router : Router,
    private authStore : Store<{loginStatus: boolean}>
  ) { }

  ngOnInit(): void {
    this.getData()
  }

  getData(): void {
    this.userService.getProfile().subscribe({
      next: (response : any) => { 
        this.data = response.data
      },
      error: () => {
        this.authStore.dispatch(AuthFail())
        this.router.navigateByUrl('/login')
      },
      complete: () => { this.getLoginStatus = true }
    })
  }
  formatUrl(url:string) : string{
    return url.replace("watch?v=", "embed/")
  }
}
