import { HttpInterceptor } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { RegisterService } from 'src/app/register.service'
import { RegisterComponent } from './register/register.component';

@Injectable({
  providedIn: 'root'
})
export class InterceptorServiceService implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(req,next){
    let authService = this.injector.get(RegisterService)
    let tokenizedReq = req.clone(
      {
        headers : req.headers.set('Autherization', 'Bearer ' + authService.getToken())
      }
    )

    return next.handle(tokenizedReq);
  }
}
