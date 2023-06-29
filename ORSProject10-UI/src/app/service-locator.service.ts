import { Injectable } from '@angular/core';
import { HttpServiceService } from './http-service.service';
import { DataValidator } from './utility/data-validator';
import { Router, ActivatedRoute } from '@angular/router';
import { EndpointServiceService } from './endpoint-service.service';

@Injectable({
  providedIn: 'root'
})

export class ServiceLocatorService {

  
  httpService = null;
  dataValidator = null;
  router = null;
  endpoints = null;

  constructor(private hs: HttpServiceService, private dv: DataValidator, private r: Router, private ep: EndpointServiceService) {
    this.httpService = hs;
    this.dataValidator = dv;
    this.router = r;
    this.endpoints = ep;
  }
 
  /**
   * get path variable from url
   * 
   * @param route 
   * @param callback 
   */
  getPathVariable(route: ActivatedRoute, callback) {
    route.params.subscribe(params => {
      callback(params)
    });
    //ActivatedRoute - frnt par current routing se value ko abstract (value ko niklna) ka kaam krti hai 
    //current routes se data fetch krne ka kaam karta 
    //current routes se variable get krta
  }

  /**
   * Forward to page 
   * 
   * @param page 
   */
  forward(page){
    this.router.navigateByUrl(page);
  }
 // navigateByUrl- forward method ke andar humne router ki navigateByUrl method ka use kiya jo page ko navigate krne ka kaam krti hai 
 // app.routing par bejdegyi 
}
