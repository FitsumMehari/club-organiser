import { Component } from '@angular/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent {
  events = [
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
