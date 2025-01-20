import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  constructor(private http: HttpClient, private router: Router) {
    if (!!localStorage.getItem('token')) {
      this._user.next(jwtDecode(localStorage.getItem('token') || ''));
    } else {
      this._user.next({});
    }
  }
  _response: BehaviorSubject<any> = new BehaviorSubject([]);
  _user: BehaviorSubject<any> = new BehaviorSubject([]);

  apiUrl = environment.apiURL;

  ngOnInit(): void {
    if (!!localStorage.getItem('token')) {
      this._user.next(jwtDecode(localStorage.getItem('token') || ''));
    } else {
      this._user.next({});
    }
  }
  forgotPassword(data: any) {
    this.http.post(`${this.apiUrl}auth/forgot-password`, data).subscribe(
      (next) => {
        if (next) {
          this._response.next(next);
          let response: any = { message: '' };
          response = next;
          if (!!response) alert(response.message);
        } else {
          this.router.navigate(['/reset-password']);
        }
      },
      (error) => {}
    );
  }
  resetPassword(data: any) {
    this.http.post(`${this.apiUrl}auth/reset-password`, data).subscribe(
      (next) => {
        this._response.next(next);
        let response: any = { message: '' };
        response = next;
        alert(response.message);
        this.router.navigate(['/login']);
      },
      (error) => {}
    );
  }

  login(data: any) {
    this.http.post(`${this.apiUrl}auth/login`, data).subscribe(
      (next) => {
        if (next) {
          this._response.next(next);
          let response: any = { message: '', accessToken: {} };
          response = next;
          if (!!response) alert(response.message);
          if (response.message == 'Log In Successful!') {
            localStorage.setItem('token', response.accessToken);

            this._user.next(jwtDecode(response.accessToken));
            this.router.navigate([{ outlets: { authorized: ['status'] } }]);
            window.location.reload();
            this.router.navigate([{ outlets: { authorized: ['status'] } }]);
          } else {
            this.router.navigate(['login']);
          }
        } else {
          this.router.navigate(['login']);
        }
      },
      (error) => {}
    );
  }

  logout() {
    localStorage.removeItem('token');
    this._user.next('');
    this.router.navigate(['/']);
    window.location.reload();
  }
}
