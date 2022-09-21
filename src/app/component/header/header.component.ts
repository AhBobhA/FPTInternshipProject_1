import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  @Input() login : boolean = false
  @Output() logoutEvent = new EventEmitter()

  constructor(
    private authService : AuthService,
    private router : Router
  ) { }

  ngOnInit(): void {
  }

  logout() : void {
    this.authService.logout()
    this.logoutEvent.emit('logout')
    this.router.navigateByUrl('/login')
  }
}
