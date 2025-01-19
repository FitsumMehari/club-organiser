import { Component, OnInit } from '@angular/core';
import { ClubsService } from '../../services/clubs.service';
import { Club } from '../../club.interface';

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.component.html',
  styleUrl: './clubs.component.css',
})
export class ClubsComponent implements OnInit {
  constructor(private clubsService: ClubsService) {}

  allClubs:any = []

  ngOnInit(): void {
    this.clubsService.getAllClubs();
    this.clubsService._clubs.subscribe((next) => {
      this.allClubs = next;
    });
  }
}
