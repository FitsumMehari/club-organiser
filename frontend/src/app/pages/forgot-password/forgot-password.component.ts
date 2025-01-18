import { Component } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  formdetails = {
    left: {
      top: {
        title: 'FORGOT PASSWORD',
        description: 'Enter your Email for a Password Reset Link',
      }
    },
    right: {
      top: {
        inputs: [
          { label: 'Email', type: 'email' },
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
