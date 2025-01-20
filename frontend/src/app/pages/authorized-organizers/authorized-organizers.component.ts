import { Component } from '@angular/core';
import { OrganizerService } from '../../services/organizer.service';

@Component({
  selector: 'app-authorized-organizers',
  templateUrl: './authorized-organizers.component.html',
  styleUrl: './authorized-organizers.component.css'
})
export class AuthorizedOrganizersComponent {
constructor(private organizersService: OrganizerService) {}

  organizers: any;
  organizersFound: boolean = false;
  filterInput: any;

  ngOnInit(): void {
    this.organizersService.getAllOrganizers();
    this.organizersService._response.subscribe((next) => {
      if (next) {
        this.organizersFound = true;
      }
      this.organizers = next;
    });
  }

  updateOrganizer(organizerId: any) {}
  deleteOrganizer(organizerId: any) {
    this.organizersService.deleteOrganizer(organizerId);
    window.location.reload()
  }
}
