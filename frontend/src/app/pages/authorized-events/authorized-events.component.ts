import { Component } from '@angular/core';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-authorized-events',
  templateUrl: './authorized-events.component.html',
  styleUrl: './authorized-events.component.css'
})
export class AuthorizedEventsComponent {
 constructor(private eventsService: EventsService) {}

  events: any;
  eventsFound: boolean = false;
  filterInput: any;

  ngOnInit(): void {
    this.eventsService.getAllEvents();
    this.eventsService._response.subscribe((next) => {
      if (next) {
        this.eventsFound = true;
      }
      this.events = next;
    });
  }

  updateevent(eventId: any) {}
  deleteevent(eventId: any) {
    this.eventsService.deleteEvent(eventId)
  }
}
