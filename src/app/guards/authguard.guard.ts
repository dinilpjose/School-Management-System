import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})


export class AuthguardGuard implements CanActivate {

  loggedIn=false;
  
  constructor(private loginService:LoginService, private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.loginService.isLogedIn.subscribe(data => {this.loggedIn = data})
    var jsonStringObj:any = sessionStorage.getItem('DATA');
      const obj:any = JSON.parse(jsonStringObj);
    if (this.loggedIn==true || (obj?.jwtToken))
      return true;
    else {
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
