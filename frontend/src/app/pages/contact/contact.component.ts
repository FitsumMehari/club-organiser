import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {
  formdetails = {
    left: {
      top: {
        title: 'CONTACT INFORMATION',
        description: 'Don’t hesitate to ask us right away!',
      },
      middle: {
        phone: '+123456789',
        email: 'example@gmail.com',
        location: 'Mekelle University',
      },
      bottom: {
        icons: ['instagram.svg', 'facebook.svg', 'linkedin.svg', 'youtube.svg'],
      },
    },
    right: {
      top: {
        inputs: [
          { label: 'First-Name', type: 'text' },
          { label: 'Last-Name', type: 'text' },
          { label: 'Email', type: 'email' },
          { label: 'Phone-Number', type: 'tel' },
          { label: 'Message', type: 'text' },
        ],
      },
      bottom: {
        right: {
          top: "SEND MESSAGE",
        }
      },
    },
  };
ngOnInit(): void {

}
  handleSubmit($event:any) {
    console.log($event);
  }
}
