import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}
  _response: BehaviorSubject<any> = new BehaviorSubject([]);

  apiUrl = environment.apiURL;

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
}
