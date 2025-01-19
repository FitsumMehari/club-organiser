import { Component } from '@angular/core';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent {
   constructor(private eventsService: EventsService) {}

    allEvents:any = []

    ngOnInit(): void {
      this.eventsService.getAllEvents();
      this.eventsService._response.subscribe((next) => {
        this.allEvents = next;
      });
    }
}
