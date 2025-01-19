import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClubsService {
  constructor(private http: HttpClient) {}
  _clubs: BehaviorSubject<any> = new BehaviorSubject([]);

  apiUrl = environment.apiURL;
  getAllClubs() {
    this.http.get(`${this.apiUrl}clubs`).subscribe(
      (next) => {
        this._clubs.next(next);
      },
      (error) => {}
    );
  }
}
