import { Injectable } from '@angular/core';
import {Router , CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import { RegisterService } from './register.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 constructor(private router: Router, private registerService: RegisterService){

 }
  

 canActivate():boolean{
   if(this.registerService.loggedIn()){
     return true;
   }else{
     this.router.navigate(['/login'])
     return false;
   }
 }
  
}
