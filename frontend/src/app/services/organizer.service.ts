import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrganizerService {
 constructor(private http: HttpClient, private router: Router) {}
  _response: BehaviorSubject<any> = new BehaviorSubject([]);

  apiUrl = environment.apiURL;
  getAllOrganizers() {
    let headers = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`    }

    this.http.get(`${this.apiUrl}auth/organizers`, {headers: headers}).subscribe(
      (next) => {
        this._response.next(next);
      },
      (error) => {}
    );
  }

  deleteOrganizer(organizerId: any) {
    let headers = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`    }
    this.http
      .delete(`${this.apiUrl}auth/organizers/${organizerId}`, {
        headers: headers
      })
      .subscribe(
        (next) => {
          this._response.next(next);
          let response: any = { message: '' };
          response = next;
          alert(response.message);
          // this.router.navigate(['/clubs']);
          this.router.navigate([{outlets: {authorized: ['organizers']}}])
        },
        (error) => {}
      );
  }
}
