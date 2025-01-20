import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  constructor(private http: HttpClient, private router: Router) {}
  _response: BehaviorSubject<any> = new BehaviorSubject([]);

  apiUrl = environment.apiURL;
  getAllEvents() {
    this.http.get(`${this.apiUrl}events`).subscribe(
      (next) => {
        this._response.next(next);
      },
      (error) => {}
    );
  }

  joinEvent(eventId: any, data: any) {
    this.http
      .post(`${this.apiUrl}events/reserve/${eventId}`, data)
      .subscribe(
        (next) => {
          this._response.next(next);
          let response: any = { message: '' };
          response = next;
          alert(response.message);
          this.router.navigate(['/events']);
        },
        (error) => {}
      );
  }
  deleteEvent(eventId: any) {
    let headers = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`    }
    this.http
      .delete(`${this.apiUrl}managers/club/events/${eventId}`, {
        headers: headers
      })
      .subscribe(
        (next) => {
          this._response.next(next);
          let response: any = { message: '' };
          response = next;
          alert(response.message);
          // this.router.navigate(['/clubs']);
          this.router.navigate([{outlets: {authorized: ['events']}}])
        },
        (error) => {}
      );
  }
}
