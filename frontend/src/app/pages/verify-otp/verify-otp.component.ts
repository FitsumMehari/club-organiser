import { Component } from '@angular/core';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrl: './verify-otp.component.css'
})
export class VerifyOTPComponent {
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
          { label: 'Code', type: 'text' },
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
