import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpServiceService } from './http-service.service';

//httpInterceptor-httpreq ko intersepect aur modifi krti 
// req ke sath header me 3 chiz bejti hai  token ko get kara aur header me set kara 
//har req par chle gyi hai 
@Injectable({
  providedIn: 'root'
})
export class AuthService implements HttpInterceptor {

  constructor(private http: HttpServiceService) { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler) {
//login se phle ye condition nai chle gyi 
    if (localStorage.getItem('fname') && localStorage.getItem('token')) {
      req = req.clone({
        setHeaders: {
        "withCredentials" : "true",
        "name" : "Akshay",
          
          Authorization: this.http.getToken()
        }
      })
    }
        console.log(req.headers.get("Authorization")+"------------------->>>")
    return next.handle(req);
// next.handle- agli req ko check kare gyi 
  }

}