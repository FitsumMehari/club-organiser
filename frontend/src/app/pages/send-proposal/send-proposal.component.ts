import { Component } from '@angular/core';
import { ProposalService } from '../../services/proposal.service';

@Component({
  selector: 'app-send-proposal',
  templateUrl: './send-proposal.component.html',
  styleUrl: './send-proposal.component.css'
})
export class SendProposalComponent {
  constructor(private proposalService: ProposalService) {}
  formdetails = {
    left: {
      top: {
        title: 'FILL IN THE FORM TO SUBMIT YOUR PROPOSAL',
      },
    },
    right: {
      top: {
        inputs: [
          { label: 'username', type: 'text' },
          { label: 'email', type: 'email' },
          { label: 'phone', type: 'tel' },
          { label: 'name', type: 'text' },
          { label: 'category', type: 'select', options: ["undefined", "social", "academic", "management"] },
          { label: 'password', type: 'password' },
          { label: 'description', type: 'text' },
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
   this.proposalService.sendProposal($event)
  }
}
