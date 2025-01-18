import { Component } from '@angular/core';

@Component({
  selector: 'app-send-proposal',
  templateUrl: './send-proposal.component.html',
  styleUrl: './send-proposal.component.css'
})
export class SendProposalComponent {
  formdetails = {
    left: {
      top: {
        title: 'FILL IN THE FORM TO SUBMIT YOUR PROPOSAL',
      },
    },
    right: {
      top: {
        inputs: [
          { label: 'First-Name', type: 'text' },
          { label: 'Club-Name', type: 'text' },
          { label: 'Email', type: 'email' },
          { label: 'Phone', type: 'tel' },
          { label: 'Category', type: 'select', options: ["undefined", "social", "academic", "management"] },
          { label: 'Password', type: 'password' },
          { label: 'Club-Description', type: 'text' },
        ],
      },
      bottom: {
        right: {
          top: "Send Proposal",
          bottom: {
            text: "Already a member?",
            linkText: "Sign-in Here",
            linkAddress: "/login"
          }
        }
      },
    },
  };

  handleSubmit($event:any) {
    console.log($event);
  }
}
