import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  constructor(private authService: AuthService){}
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
          { label: 'email', type: 'email' },
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
    this.authService.forgotPassword($event);
  }
}
