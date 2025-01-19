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
}
