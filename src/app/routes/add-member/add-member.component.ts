import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { User } from '../../model/user'
import { LSManagerService } from 'src/app/services/ls-manager.service'

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css']
})
export class AddMemberComponent implements OnInit {
  name : string = ''
  username : string = ''
  email : string = ''
  address : string = ''
  gender : string = 'Male'

  nameError : boolean = false
  nameEMsg : string = ''

  usernameError : boolean = false
  usernameEMsg : string = ''

  emailError : boolean = false
  emailEMsg : string = ''

  addressError : boolean = false
  addressEMsg : string = ''

  @Output() addAccount: EventEmitter<User> = new EventEmitter()

  constructor(
    private lsManager : LSManagerService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    let errorTrg : boolean = false
    let data : User[] = this.lsManager.getAccountList()

    if (this.name.length === 0) {
      errorTrg = true
      this.nameError = true
      this.nameEMsg = 'Name is required'
    } else {
      this.nameError = false
    }

    if (this.username.length === 0) {
      errorTrg = true
      this.usernameError = true
      this.usernameEMsg = 'Username is required'
    } else {
      if (data.some(e => e.username === this.username)) {
        errorTrg = true
        this.usernameError = true
        this.usernameEMsg = 'Username already existed'
      } else {
        this.usernameError = false
      }
    }

    if (this.email.length === 0) {
      errorTrg = true
      this.emailError = true
      this.emailEMsg = 'Email is required'
    } else {
      let emailRegex = new RegExp(/\w+@+\w+\.+\w/)
      if (!this.email.match(emailRegex)) {
        errorTrg = true
        this.emailError = true
        this.emailEMsg = 'Invalid email'
      } else {
        if (data.some(e => e.email === this.email)) {
          errorTrg = true
          this.emailError = true
          this.emailEMsg = 'Email already existed'
        } else {
          this.emailError = false
        }
      }
    }

    if (this.address.length === 0) {
      errorTrg = true
      this.addressError = true
      this.addressEMsg = 'Address is required'
    } else {
      this.addressError = false
    }

    
    if (errorTrg === true) {
      //alert(errorMsg)
      return
    } else {
      //Create new user object
      let newUser : User = {
        name: this.name,
        username: this.username,
        email: this.email,
        address: this.address,
        gender: this.gender
      }

      //Emit event
      let currentList = this.lsManager.getAccountList()
      currentList.push(newUser)
      this.lsManager.saveToLS(currentList)

      //Reset input field
      this.resetForm()
    }
  }

  resetForm(){
    this.name = ''
    this.username = ''
    this.email = ''
    this.address = ''
    this.gender = ''
    this.nameError = false
    this.usernameError = false
    this.emailError = false
    this.addressError = false
  }
}
