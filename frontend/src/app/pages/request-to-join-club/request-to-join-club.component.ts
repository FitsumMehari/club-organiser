import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-request-to-join-club',
  templateUrl: './request-to-join-club.component.html',
  styleUrl: './request-to-join-club.component.css'
})
export class RequestToJoinClubComponent {
  constructor(private route:ActivatedRoute){}
  formdetails = {
    left: {
      top: {
        title: 'REQUEST TO JOIN A CLUB',
        description: 'Please fill int he form.',
      }
    },
    right: {
      top: {
        inputs: [
          { label: 'First-Name', type: 'text' },
          { label: 'Email', type: 'email' },
          { label: 'Phone-Number', type: 'tel' },
        ],
      },
      bottom: {
        right: {
          top: "SUBMIT REQUEST",
        }
      },
    },
  };

  handleSubmit($event:any) {
    console.log($event);
    console.log(this.route.snapshot.params["clubID"]);

  }
}
