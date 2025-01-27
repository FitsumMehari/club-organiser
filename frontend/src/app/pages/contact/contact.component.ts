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
          { label: 'FirstName', type: 'text' },
          { label: 'LastName', type: 'text' },
          { label: 'Email', type: 'email' },
          { label: 'PhoneNumber', type: 'tel' },
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

    if($event.PhoneNumber.match(/[a-z]/i) || $event.PhoneNumber == ''){
      alert("Invalid Phone Number")
    }
    else if(!$event.Email.match(/[@]/) || $event.Email == ''){
      alert("Invalid Email")
    }
    else if($event.FirstName == ''){
      alert("Invalid First Name")
    }
    else if($event.LastName == ''){
      alert("Invalid Last Name")
    }
    else if($event.Message == ''){
      alert("Invalid Message")
    }
    else {
      alert("Thank you for your message!")
      window.location.reload()
      // console.log($event.FirstName);
      // console.log($event.LastName);
      // console.log($event.Email);
      // console.log($event.PhoneNumber);
      // console.log($event.Message);
    }
  }
}
