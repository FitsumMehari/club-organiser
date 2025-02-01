import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-authorized-add-event-details',
  templateUrl: './authorized-add-event-details.component.html',
  styleUrl: './authorized-add-event-details.component.css',
})
export class AuthorizedAddEventDetailsComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private eventService: EventsService
  ) {}

  event: any = {
    name: '',
    description: '',
    category: '',
    status: '',
  };
  selectedLogo: File | null = null;

  loading: boolean = false;
  eventFound: boolean = false;
  eventValuesChanged: boolean = false;
  ngOnInit(): void {
    this.getEvent();
    this.loading = false

  }
  getEvent() {
    this.eventService.getOneEventById(
      this.activatedRoute.snapshot.params['eventId']
    );
    this.eventService._response.subscribe((next) => {
      if (next) {
        this.eventFound = true;
        this.event = { ...next };
        this.event = next;
      }
    });
  }
  updateEvent(eventForm: any) {
    this.loading = true

    this.eventService.updateEvent(this.event._id, eventForm.value,  this.selectedLogo);
  }

  acceptAttendee(eventId: any, attendeeEmail: any) {
    this.eventService.acceptAttendee(eventId, attendeeEmail);
    this.loading = true;
    // window.location.reload();
  }
  removeAttendee(eventId: any, attendeeEmail: any) {
    this.eventService.removeAttendee(eventId, attendeeEmail);
    this.loading = true;

    // window.location.reload();
  }
  onFileChange(event: any) {
    this.selectedLogo = event.target.files[0] || null;
  }
}
