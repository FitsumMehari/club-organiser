import { Component } from '@angular/core';
import { ClubsService } from '../../services/clubs.service';
import { ActivatedRoute } from '@angular/router';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';


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

  filterInput: any;
  club: any = {
    name: '',
    description: '',
    category: '',
    status: '',
  };
  selectedLogo: File | null = null;

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
        this.loading = false
      }
    });
  }
  updateClub(clubForm: any) {
    this.loading = true
    this.clubService.updateClub(this.club._id, clubForm.value, this.selectedLogo);
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

  onFileChange(event: any) {
    this.selectedLogo = event.target.files[0] || null;
  }

}
