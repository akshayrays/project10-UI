import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router'

//Ajax calling ka kam karti
//ajax calling backend par req bejti hai
@Injectable()
//is class ko kisi bhi other class ke construtor me inject kar ke use kar skte 

//

export class HttpServiceService {


  token = '';
  form = {
  message: '',
  error: false
  };
 

  userparams = {
    url: '',
    sessionExpiredMsg: '',
    methodType: '',
  };


  setToken(token) {
    this.token = localStorage.getItem('token');
  //  console.log(this.token + '----> inside setToken');
  }

  getToken() {
    console.log(localStorage.getItem('token') + '====>> getToken');
    return localStorage.getItem('token');
  }

  constructor(private router: Router, private httpClient: HttpClient) {

  }
  isLogout() {
    let JSESSIONID = localStorage.getItem('fname');
    if ((JSESSIONID == "null" || JSESSIONID === null)&& (this.router.url != "/login"
    && this.router.url != "/Auth"
    && this.router.url != "/logout" 
    && this.router.url != "/forgotpassword" 
    && this.router.url != "/signup"
    && this.router.url != "/login/true" 
    )) {
      this.form.message = "Your Session has been Expired! Please Re-Login";
      this.form.error = true;
      this.userparams.url = this.router.url;// to navigate the URI request.
      this.router.navigateByUrl("/login");
      console.log("Akshay ");
  
    return true;
      } else {
    return false;
      } 
  }

//endpoint backend ka address , callback hai optional para
//caustom get post
  get(endpoint, callback) {
    if (this.isLogout()) {
      console.log('inside isLogout() return true');
      return true;
    }
    //callbackfunction
    return this.httpClient.get(endpoint).subscribe((data) => {
      console.log('Data :: ' + data);
      callback(data);

    });
  }

  post(endpoint, bean, callback) {
    if (this.isLogout()) {
      console.log('inside isLogout return true')
      return true;
    }
    return this.httpClient.post(endpoint, bean).subscribe((data) => {
      console.log(data);
      callback(data);

    }, error => {
      console.log('ORS Error--', error);
    });
  }


}


