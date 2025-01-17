import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'club-organiser';
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
        left: "Forgot Password",
        right: {
          top: "LOGIN",
          bottom: {
            text: "Don't have an account?",
            linkText: "Register Now",
            linkAddress: "/send-proposal"
          }
        }
      },
    },
  };

  handleSubmit($event:any) {
    console.log($event);
  }
}
