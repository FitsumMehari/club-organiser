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

  getAllEventsByOrganizer(organizerId: any) {
    this.http.get(`${this.apiUrl}events/${organizerId}`).subscribe(
      (next) => {
        this._response.next(next);
      },
      (error) => {}
    );
  }
  getOneEventById(eventId: any) {
    this.http.get(`${this.apiUrl}events/byId/${eventId}`).subscribe(
      (next) => {
        this._response.next(next);
      },
      (error) => {}
    );
  }

  updateEvent(eventId: any, event: any, logo:any) {
    const formData = new FormData();

    formData.append('event', JSON.stringify( event ));
    formData.append('logo', logo)

    let headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    this.http
      .put(`${this.apiUrl}events/${eventId}`, formData, {
        headers: headers,
      })
      .subscribe(
        (next) => {
          this._response.next(next);
          let response: any = { message: '', newValues: {} };
          response = next;
          alert(response.message);
          // this.router.navigate(['/clubs']);
          this.router.navigate([{ outlets: { authorized: ['events'] } }]);
        },
        (error) => {}
      );
  }

  joinEvent(eventId: any, data: any) {
    this.http.post(`${this.apiUrl}events/reserve/${eventId}`, data).subscribe(
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
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    this.http
      .delete(`${this.apiUrl}managers/club/events/${eventId}`, {
        headers: headers,
      })
      .subscribe(
        (next) => {
          this._response.next(next);
          let response: any = { message: '' };
          response = next;
          alert(response.message);
          // this.router.navigate(['/clubs']);
          this.router.navigate([{ outlets: { authorized: ['events'] } }]);
        },
        (error) => {}
      );
  }

  addEvent(clubId: any, event: any) {
    let headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    this.http
      .post(`${this.apiUrl}managers/club/events/${clubId}`, event, {
        headers: headers,
      })
      .subscribe(
        (next) => {
          this._response.next(next);
          let response: any = { message: '' };
          response = next;
          alert(response.message);
          // this.router.navigate(['/clubs']);
          this.router.navigate([{ outlets: { authorized: ['events'] } }]);
        },
        (error) => {}
      );
  }

  acceptAttendee(eventId: any, attendeeEmail: any) {
    let headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    this.http
      .put(`${this.apiUrl}managers/club/event/approvereservation/${eventId}`, {email: attendeeEmail}, {
        headers: headers,
      })
      .subscribe(
        (next) => {
          this._response.next(next);
          let response: any = { message: '', newValues: {} };
          response = next;
          alert(response.message);
          // this.router.navigate(['/clubs']);
          this.router.navigate([{ outlets: { authorized: ['events'] } }]);
        },
        (error) => {}
      );
  }
  removeAttendee(eventId: any, attendeeEmail: any) {
    let headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    this.http
      .put(`${this.apiUrl}managers/club/event/declinereservation/${eventId}`, {email: attendeeEmail}, {
        headers: headers,
      })
      .subscribe(
        (next) => {
          this._response.next(next);
          let response: any = { message: '', newValues: {} };
          response = next;
          alert(response.message);
          // this.router.navigate(['/clubs']);
          this.router.navigate([{ outlets: { authorized: ['events'] } }]);
        },
        (error) => {}
      );
  }
}
