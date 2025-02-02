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

  sortOption: string = ''

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
  sortClubs() {
    if (!this.sortOption) return;

    const [key, order] = this.sortOption.split('-');
    this.clubs.sort((a: any, b: any) => {
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
