import { Component, OnInit } from '@angular/core'
import { User } from '../../model/user'
import { LSManagerService } from 'src/app/services/ls-manager.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  users : Array<User> = []
  enableEdit : boolean = false
  popupIndex : number = 0
  selectedUser : User = {
    name: '',
    username: '',
    email: '',
    address: '',
    gender: ''
  }

  constructor(
    private lsManager : LSManagerService,
  ) { }

  ngOnInit(): void {
    this.users = this.lsManager.getAccountList()
  }

  setCurrentUser(index : number) {
    this.enableEdit = true
    this.selectedUser = this.users[index]
    this.popupIndex = index
  }

  updateUsers(account:User){
    this.selectedUser = account
    this.lsManager.saveToLS(this.users)
  }
  deleteAccount(index : number){
    console.log(index)
    this.users.splice(index, 1)
    this.lsManager.saveToLS(this.users)
  }
}
