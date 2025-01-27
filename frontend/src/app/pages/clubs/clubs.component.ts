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

  allClubs: any = [];
  filterInput: any;

  ngOnInit(): void {
    this.clubsService.getAllClubs();
    // this.clubsService._response.subscribe((next) => {
    //   this.allClubs = next;
    // });
    this.setClubs()
  }

   filterClubs(category: any) {
    // this.clubsService.getAllClubs();

     this.setClubs()
    this.allClubs = this.allClubs.filter((club:any) => club.category === category)
  }

   setClubs() {
     this.clubsService._response.subscribe( (next) => {
       this.allClubs = next;
    });
  }
}
