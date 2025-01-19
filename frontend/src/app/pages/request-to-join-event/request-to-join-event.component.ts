import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-request-to-join-event',
  templateUrl: './request-to-join-event.component.html',
  styleUrl: './request-to-join-event.component.css'
})
export class RequestToJoinEventComponent {
constructor(private route:ActivatedRoute, private eventService: EventsService){}
  formdetails = {
    left: {
      top: {
        title: 'REQUEST A TICKET',
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
    this.eventService.joinEvent(this.route.snapshot.params["eventID"], $event)
  }
}
