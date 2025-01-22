import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../services/events.service';
import { ClubsService } from '../../services/clubs.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-authorized-add-event',
  templateUrl: './authorized-add-event.component.html',
  styleUrl: './authorized-add-event.component.css',
})
export class AuthorizedAddEventComponent implements OnInit {
  constructor(
    private eventService: EventsService,
    private clubService: ClubsService,
    private authService: AuthService
  ) {}
  event: any = {};
  user: any;
  club: any;
  ngOnInit(): void {
    this.authService._user.subscribe((next) => {
      this.user = next;
    });
    this.clubService.getClubByManager();

    this.clubService._response.subscribe((next) => {
      this.club = { ...next };
    });
  }
  add() {
    this.eventService.addEvent(this.club._id, this.event)
  }
}
