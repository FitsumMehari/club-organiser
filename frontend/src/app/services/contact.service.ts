import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private http: HttpClient) {}
  apiUrl = environment.apiURL;
  _response: BehaviorSubject<any> = new BehaviorSubject([]);

  sendMessage(details: any) {
    this.http.post(`${this.apiUrl}contactus/`, details).subscribe(
      (next) => {
        this._response.next(next);
        let response: any = { message: '' };
        response = next;
        alert(response.message);
        window.location.reload();
      },
      (error) => {}
    );
  }
}
