import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/model/user';
@Component({
  selector: 'app-edit-window',
  templateUrl: './edit-window.component.html',
  styleUrls: ['./edit-window.component.css']
})
export class EditWindowComponent implements OnInit {
  @Input() account : User = {
    name: '',
    username: '',
    email: '',
    address: '',
    gender: ''
  }
  @Input() index : number = -1
  @Input() data : User[] = [] 
  @Output() accountChange = new EventEmitter<User>()
  @Output() closePopupEvent = new EventEmitter<boolean>()
  @Input() edit : boolean = false

  constructor() { }

  ngOnInit(): void {
  }

  toggleEdit(){
    this.edit = !this.edit
  }

  saveEdit(){
    this.account.name = (document.getElementById("name") as HTMLInputElement).value
    this.account.username = (document.getElementById("username") as HTMLInputElement).value
    this.account.email = (document.getElementById("email") as HTMLInputElement).value
    this.account.address = (document.getElementById("address") as HTMLInputElement).value
    if ((document.getElementById("genderM") as HTMLInputElement).checked) {
      this.account.gender = 'Male'
    } else {
      this.account.gender = 'Female'
    }
    this.account.address = (document.getElementById("address") as HTMLInputElement).value
    let errorMsg : string = ''
    let errorTrg : boolean = false

    if (this.account.name.length === 0) {
      errorTrg = true
      errorMsg = errorMsg.concat('Name is required\n')
    }

    if (this.account.username.length === 0) {
      errorTrg = true
      errorMsg = errorMsg.concat('Username is required\n')
    } else {
      if (this.data.some((e, index) => e.username === this.account.username && this.index !== index)) {
        errorTrg = true
        errorMsg = errorMsg.concat('Username already existed\n')
      }
    }

    if (this.account.email.length === 0) {
      errorTrg = true
      errorMsg = errorMsg.concat('Email is required\n')
    } else {
      let emailRegex = new RegExp(/\w+@+\w+\.+\w/)
      if (!this.account.email.match(emailRegex)) {
        errorTrg = true
        errorMsg = errorMsg.concat('Invalid email')
      } else {
        if (this.data.some((e, index) => e.email === this.account.email && this.index !== index)) {
          errorTrg = true
          errorMsg = errorMsg.concat('Email already existed')
        }
      }
    }

    if (this.account.address.length === 0) {
      errorTrg = true
      errorMsg = errorMsg.concat('Address is required\n')
    }
    
    if (errorTrg === true) {
      alert(errorMsg)
      return
    } else {
      this.accountChange.emit(this.account)
      this.toggleEdit()
    }
  }

  cancelEdit(){
    (document.getElementById("name") as HTMLInputElement).value = this.account.name;
    (document.getElementById("username") as HTMLInputElement).value = this.account.username; 
    (document.getElementById("email") as HTMLInputElement).value =  this.account.email;
    (document.getElementById("address") as HTMLInputElement).value = this.account.address;
    if ((this.account.gender) === 'Male') {
      (document.getElementById("genderM") as HTMLInputElement).checked = true;
      (document.getElementById("genderF") as HTMLInputElement).checked = false;
    } else {
      (document.getElementById("genderF") as HTMLInputElement).checked = true;
      (document.getElementById("genderM") as HTMLInputElement).checked = false;
    }
    this.toggleEdit()
  }

  closeEdit(){
    this.closePopupEvent.emit(true)
  }

}
