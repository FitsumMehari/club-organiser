import { Component } from '@angular/core';
import { OrganizerService } from '../../services/organizer.service';
import { EventsService } from '../../services/events.service';
import { ProposalService } from '../../services/proposal.service';
import { ClubsService } from '../../services/clubs.service';

@Component({
  selector: 'app-authorized-status',
  templateUrl: './authorized-status.component.html',
  styleUrl: './authorized-status.component.css'
})
export class AuthorizedStatusComponent {
  constructor(
    private organiserService: OrganizerService,
    private eventService: EventsService,
    private clubService: ClubsService,
    private proposalService: ProposalService,
  ) {}

  clubs: any;
  proposals: any;
  events: any;

  ngOnInit(): void {
    this.refreshClubsList();
    this.refreshProposalsList();
    this.refreshEventsList();
  }
  // Refresh The Lists
  refreshClubsList() {
    this.clubService.getAllClubs();
    this.clubService._response.subscribe((next) => {
      this.clubs = next;
    });
  }

  refreshEventsList() {
    this.eventService.getAllEvents();
    this.eventService._response.subscribe((next) => {
      this.events = next;
    });
  }

  refreshProposalsList() {
    this.proposalService.getAllProposals();
    this.proposalService._response.subscribe((next) => {
      this.proposals = next;
    });
  }


}
