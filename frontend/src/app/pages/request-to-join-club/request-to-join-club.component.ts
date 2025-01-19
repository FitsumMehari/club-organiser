import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClubsService } from '../../services/clubs.service';

@Component({
  selector: 'app-request-to-join-club',
  templateUrl: './request-to-join-club.component.html',
  styleUrl: './request-to-join-club.component.css'
})
export class RequestToJoinClubComponent {
  constructor(private route:ActivatedRoute, private clubsService: ClubsService){}
  formdetails = {
    left: {
      top: {
        title: 'REQUEST TO JOIN A CLUB',
        description: 'Please fill in the form.',
      }
    },
    right: {
      top: {
        inputs: [
          { label: 'name', type: 'text' },
          { label: 'email', type: 'email' },
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
    this.clubsService.joinClub(this.route.snapshot.params["clubID"], $event)
  }
}
