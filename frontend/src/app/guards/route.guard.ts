import { Injectable, OnInit } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate, OnInit {
  constructor(private router: Router) {}

  user = {isLoggedIn : false}
  ngOnInit(): void {}

  canActivate(): boolean {
    let token = localStorage.getItem('token');
    if (!!token) {
      this.user = jwtDecode(token);
      if (this.user?.isLoggedIn) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
