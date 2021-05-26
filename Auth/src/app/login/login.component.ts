import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../register.service';
import { User } from '../register/register.model';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginFormData = new User('','')
  constructor(private login: RegisterService, private router: Router) { }

  ngOnInit(): void {
  }

  loginUser(){
    this.login.loginUser(this.loginFormData).subscribe(
      res => {localStorage.setItem('token', res.token),
    this.router.navigate(['/special'])},
      err => console.log(err)
    )
  }

}
