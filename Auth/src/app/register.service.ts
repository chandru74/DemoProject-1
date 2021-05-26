import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  _registerurl = 'http://localhost:3000/api/register';
  _loginUrl = "http://localhost:3000/api/login";

  constructor(private _http: HttpClient) { }

  registerUser(user){
    return this._http.post<any>(this._registerurl,user)
  }

  loginUser(user){
    return this._http.post<any>(this._loginUrl,user);
  }

  loggedIn(){
    return !!localStorage.getItem('token');
  }

  getToken(){
    return localStorage.getItem('token');
  }
}
