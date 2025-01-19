import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  constructor(private authService: AuthService) {}
  formdetails = {
    left: {
      top: {
        title: 'CREATE NEW PASSWORD',
        description: 'We have sent the OTP verification code to your email address check your email and enter the code below.',
      }
    },
    right: {
      top: {
        inputs: [
          { label: 'email', type: 'email' },
          { label: 'otp', type: 'text' },
          { label: 'newPassword', type: 'password' },
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
    this.authService.resetPassword($event);

  }
}
