import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _router: Router) { }

  canActivate(next: ActivatedRouteSnapshot): Promise<boolean> | boolean {
    var isLoggedIn = localStorage.getItem('isLoggedIn') || '0';
    if (isLoggedIn == '1') {
        return true;
    }

    // navigate to login page
    this._router.navigate(['/login']);
    return false;
  }
}
