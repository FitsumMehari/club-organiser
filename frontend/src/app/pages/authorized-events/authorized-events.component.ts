import { Component } from '@angular/core';
import { EventsService } from '../../services/events.service';
import { AuthService } from '../../services/auth.service';
import { ClubsService } from '../../services/clubs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authorized-events',
  templateUrl: './authorized-events.component.html',
  styleUrl: './authorized-events.component.css',
})
export class AuthorizedEventsComponent {
  constructor(
    private eventsService: EventsService,
    private authService: AuthService,
    private clubService: ClubsService,
    private router: Router
  ) {}

  sortOption:string = ''

  club: any;
  user: any;
  events: any;
  eventsFound: boolean = false;
  filterInput: any;

  ngOnInit(): void {
    this.authService._user.subscribe((next) => {
      this.user = next;
    });

    if (this.user.userType === 'admin') {
      this.eventsService.getAllEvents();
    } else if (this.user.userType === 'organiser') {
      this.clubService.getClubByManager();

      this.clubService._response.subscribe((next) => {
        this.club = {...next};
        if(!!this.club._id) {
          this.eventsService.getAllEventsByOrganizer(this.club._id);
        }
      });

    }
    this.eventsService._response.subscribe((next) => {
      if (next) {
        this.eventsFound = true;
      }
      this.events = next;
    });
  }

  updateevent(eventId: any) {}
  deleteevent(eventId: any) {
    this.eventsService.deleteEvent(eventId);
    window.location.reload();
  }

  gotoDetails(eventId: any){
    this.router.navigate([{outlets: {authorized: ['event-details', eventId]}}])
  }

  add() {
    this.router.navigate([{outlets: {authorized: ['add-event']}}])
  }
  sortEvents() {
    if (!this.sortOption) return;

    const [key, order] = this.sortOption.split('-');
    this.events.sort((a: any, b: any) => {
      if (a[key] < b[key]) {
        return order === 'asc' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return order === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }
}
