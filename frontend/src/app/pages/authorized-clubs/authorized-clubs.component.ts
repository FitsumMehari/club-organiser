import { Component, OnInit } from '@angular/core';
import { ClubsService } from '../../services/clubs.service';

@Component({
  selector: 'app-authorized-clubs',
  templateUrl: './authorized-clubs.component.html',
  styleUrl: './authorized-clubs.component.css',
})
export class AuthorizedClubsComponent implements OnInit {
  constructor(private clubsService: ClubsService) {}

  clubs: any;
  clubsFound: boolean = false;
  filterInput: any;

  ngOnInit(): void {
    this.clubsService.getAllClubs();
    this.clubsService._response.subscribe((next) => {
      if (next) {
        this.clubsFound = true;
      }
      this.clubs = next;
    });
  }

  updateclub(clubId: any) {}
  deleteclub(clubId: any) {
    this.clubsService.deleteClub(clubId)
    window.location.reload()
  }
}
