import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../register.service';
import { User } from './register.model';
import { Router } from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerFormData = new User("","")
  constructor(private register: RegisterService, private router: Router) { }

  ngOnInit(): void {
  }

  registerUser(){
    // console.log(this.registerFormData)
    this.register.registerUser(this.registerFormData).subscribe(
      res => {console.log(res),
      localStorage.setItem('token', res.token),
    this.router.navigate(['/special'])},
      err => console.log(err)
    )
  }

}
