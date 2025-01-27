import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProposalService {
  constructor(private http: HttpClient, private router: Router) {}
  _response: BehaviorSubject<any> = new BehaviorSubject([]);

  apiUrl = environment.apiURL;

  sendProposal(data: any) {
    let details = {
      organiser: {
        username: data.username,
        email: data.email,
        phone: data.phone,
        password: data.password,
      },
      club: {
        name: data.clubname,
        category: data.category,
        description: data.description,
      },
    };
    this.http.post(`${this.apiUrl}proposals`, details).subscribe(
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

  getAllProposals() {
    let headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };

    this.http.get(`${this.apiUrl}proposals`, { headers: headers }).subscribe(
      (next) => {
        this._response.next(next);
      },
      (error) => {}
    );
  }

  acceptProposal(proposalId: any) {
    let headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };

    this.http
      .post(`${this.apiUrl}proposals/acceptProposal/${proposalId}`, {
        headers: headers,
      })
      .subscribe(
        (next) => {
          this.rejectProposal(proposalId);
          this._response.next(next);
          let response: any = { message: '' };
          response = next;
          alert(response.message);
          this.router.navigate([{ outlets: { authorized: ['proposals'] } }]);
          window.location.reload();
        },
        (error) => {}
      );
  }
  rejectProposal(proposalId: any) {
    let headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };

    this.http
      .delete(`${this.apiUrl}proposals/${proposalId}`, { headers: headers })
      .subscribe(
        (next) => {
          this._response.next(next);
          let response: any = { message: '' };
          response = next;
          alert(response.message);
          this.router.navigate([{ outlets: { authorized: ['proposals'] } }]);
          window.location.reload();
        },
        (error) => {}
      );
  }
}
