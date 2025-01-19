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

  joinClub(clubId: any, data: any) {
    this.http
      .post(`${this.apiUrl}clubs/requestmembership/${clubId}`, data)
      .subscribe(
        (next) => {
          this._response.next(next);
          let response: any = { message: '' };
          response = next;
          alert(response.message);
          this.router.navigate(['/home']);
        },
        (error) => {}
      );
  }
}
