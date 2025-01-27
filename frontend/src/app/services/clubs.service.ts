import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ClubsService {
  constructor(private http: HttpClient, private router: Router) {}
  _response: BehaviorSubject<any> = new BehaviorSubject([]);

  apiUrl = environment.apiURL;
  getAllClubs() {
    this.http.get(`${this.apiUrl}clubs`).subscribe(
      (next) => {
        this._response.next(next);
      },
      (error) => {}
    );
  }

  getClubByManager() {
    let headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    this.http.get(`${this.apiUrl}managers/club`, {headers: headers}).subscribe(
      (next) => {
        this._response.next(next);
      },
      (error) => {}
    );
  }

  joinClub(clubId: any, data: any) {
    this.http
      .post(`${this.apiUrl}clubs/requestmembership/${clubId}`, data)
      .subscribe(
        (next) => {
          this._response.next(next);
          let response: any = { message: '' };
          response = next;
          alert(response.message);
          this.router.navigate(['/clubs']);
        },
        (error) => {}
      );
  }

  deleteClub(clubId: any) {
    let headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    this.http
      .delete(`${this.apiUrl}clubs/${clubId}`, {
        headers: headers,
      })
      .subscribe(
        (next) => {
          this._response.next(next);
          let response: any = { message: '' };
          response = next;
          alert(response.message);
          // this.router.navigate(['/clubs']);
          this.router.navigate([{ outlets: { authorized: ['clubs'] } }]);
        },
        (error) => {}
      );
  }
  updateClub(clubId: any, club:any) {
    let headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    this.http
      .put(`${this.apiUrl}clubs/${clubId}`, club, {
        headers: headers,
      })
      .subscribe(
        (next) => {
          this._response.next(next);
          let response: any = { message: '', newValues: {} };
          response = next;
          alert(response.message);
          // this.router.navigate(['/clubs']);

          this.getClubByManager()
          this.router.navigate([{ outlets: { authorized: ['manage-club'] } }]);

        },
        (error) => {}
      );
  }

  acceptMembership(clubId: any, email: any) {
    let headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    this.http
      .put(`${this.apiUrl}managers/club/approvemembership/${clubId}`, {email: email}, {
        headers: headers,
      })
      .subscribe(
        (next) => {
          this._response.next(next);
          let response: any = { message: '', newValues: {} };
          response = next;
          alert(response.message);
          // this.router.navigate(['/clubs']);
          this.router.navigate([{ outlets: { authorized: ['manage-club'] } }]);
        },
        (error) => {}
      );
  }
  removeMembership(clubId: any, email: any) {
    let headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    this.http
      .put(`${this.apiUrl}managers/club/declinemembership/${clubId}`, {email: email}, {
        headers: headers,
      })
      .subscribe(
        (next) => {
          this._response.next(next);
          let response: any = { message: '', newValues: {} };
          response = next;
          alert(response.message);
          // this.router.navigate(['/clubs']);
          this.router.navigate([{ outlets: { authorized: ['manage-club'] } }]);
        },
        (error) => {}
      );
  }
}
