import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor() { }

  canActivate(): boolean {
    if (this.UserSession()) {
      return true;
    }
    return false;
  }

  // create user session when they login
  UserSession(): boolean {
    if (localStorage.getItem('UserSession') == "true") {
      return true;
    }
    return false;
  }

  // remove user session when user logs out
  logout() {
    localStorage.removeItem('UserSession');
    localStorage.removeItem('Administrator');
  }
}
