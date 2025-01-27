import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private authService: AuthService) {
    }
  formdetails = {
    left: {
      top: {
        title: 'PLEASE SIGN IN',
        description: 'Please fill in the form .',
      },
    },
    right: {
      top: {
        inputs: [
          { label: 'email', type: 'email' },
          { label: 'password', type: 'password' },        ],
      },
      bottom: {
        left: {
          text: "Forgot Password",
          link: "/forgot-password"
        },
        right: {
          top: "LOGIN",
          bottom: {
            text: "Don't have an account?",
            linkText: "Sign-up Here",
            linkAddress: "/send-proposal"
          }
        }
      },
    },
  };

  handleSubmit($event:any) {
    if($event.email == '' || !$event.email.match(/[@]/)) {
      alert("Invalid Email")
    }
    else if($event.password == '') {
      alert("Invalid Password")
    } else {
      this.authService.login($event);
    }
  }
}
