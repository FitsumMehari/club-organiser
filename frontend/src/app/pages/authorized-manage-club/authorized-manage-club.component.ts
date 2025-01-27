import { Component } from '@angular/core';
import { ClubsService } from '../../services/clubs.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-authorized-manage-club',
  templateUrl: './authorized-manage-club.component.html',
  styleUrl: './authorized-manage-club.component.css',
})
export class AuthorizedManageClubComponent {
  constructor(
    private activatedRoute: ActivatedRoute,
    private clubService: ClubsService
  ) {}

  club: any = {
    name: '',
    description: '',
    category: '',
    status: '',
  };
  loading: boolean = false;
  clubFound: boolean = false;
  clubValuesChanged: boolean = false;
  ngOnInit(): void {
    this.getClub();
  }
  getClub() {
    this.clubService.getClubByManager();
    this.clubService._response.subscribe((next) => {
      if (next) {
        this.clubFound = true;
        this.club = { ...next };
        this.club = next;
      }
    });
  }
  updateClub(clubForm: any) {
    this.clubService.updateClub(this.club._id, clubForm.value);
    this.getClub()
  }

  acceptMember(clubId: any, email: any) {
    this.clubService.acceptMembership(clubId, email);
    this.loading = true;
    window.location.reload();
  }
  removeMember(clubId: any, email: any) {
    this.clubService.removeMembership(clubId, email);
    this.loading = true;

    window.location.reload();
  }
}
