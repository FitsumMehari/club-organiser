import { Component } from '@angular/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  formdetails = {
    left: {
      top: {
        title: 'PLEASE CHECK YOUR EMAIL',
        description: 'We have sent the OTP verification code to your email address check your email and enter the code below.',
      }
    },
    right: {
      top: {
        inputs: [
          { label: 'Email', type: 'email' },
          { label: 'OTP Code', type: 'text' },
          { label: 'New Password', type: 'password' },
        ],
      },
      bottom: {
        right: {
          top: "SUBMIT",
        }
      },
    },
  };

  handleSubmit($event:any) {
    console.log($event);

  }
}
