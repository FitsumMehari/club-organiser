import { Component } from '@angular/core';

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.component.html',
  styleUrl: './clubs.component.css',
})
export class ClubsComponent {
  clubs = [
    { image: 'image6.svg', id: '1' },
    { image: 'image7.svg', id: '2' },
    { image: 'image6.svg', id: '3' },
    { image: 'image7.svg', id: '4' },
    { image: 'image6.svg', id: '1' },
    { image: 'image7.svg', id: '2' },
    { image: 'image6.svg', id: '3' },
    { image: 'image7.svg', id: '4' },
  ];
}
