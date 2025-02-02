import { Component } from '@angular/core';
import { OrganizerService } from '../../services/organizer.service';

@Component({
  selector: 'app-authorized-organizers',
  templateUrl: './authorized-organizers.component.html',
  styleUrl: './authorized-organizers.component.css',
})
export class AuthorizedOrganizersComponent {
  constructor(private organizersService: OrganizerService) {}

  organizers: any;
  organizersFound: boolean = false;
  filterInput: any;

  sortOption: string = '';

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
    window.location.reload();
  }

  sortOrganizers() {
    if (!this.sortOption) return;

    const [key, order] = this.sortOption.split('-');
    this.organizers.sort((a: any, b: any) => {
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
