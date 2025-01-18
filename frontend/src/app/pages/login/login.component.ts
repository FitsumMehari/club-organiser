import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
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
          { label: 'Email', type: 'email' },
          { label: 'Password', type: 'password' },        ],
      },
      bottom: {
        left: "Forgot Password",
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
    console.log($event);
  }
}
