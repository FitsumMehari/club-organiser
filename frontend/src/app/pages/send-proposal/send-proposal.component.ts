import { Component } from '@angular/core';
import { ProposalService } from '../../services/proposal.service';

@Component({
  selector: 'app-send-proposal',
  templateUrl: './send-proposal.component.html',
  styleUrl: './send-proposal.component.css',
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
          { label: 'clubname', type: 'text' },
          {
            label: 'category',
            type: 'select',
            options: ['undefined', 'social', 'academic', 'management'],
          },
          { label: 'password', type: 'password' },
          { label: 'description', type: 'text' },
        ],
      },
      bottom: {
        right: {
          top: 'Send Proposal',
          bottom: {
            text: 'Already a member?',
            linkText: 'Sign-in Here',
            linkAddress: '/login',
          },
        },
      },
    },
  };

  handleSubmit($event: any) {
    if ($event.email == '' || !$event.email.match(/[@]/)) {
      alert('Invalid Email');
    } else if ($event.password == '') {
      alert('Invalid Password');
    } else if ($event.username == '') {
      alert('Invalid username');
    } else if ($event.category == '') {
      alert('Invalid category');
    } else if ($event.clubname == '') {
      alert('Invalid clubname');
    } else if ($event.description == '') {
      alert('Invalid description');
    } else if ($event.phone.match(/[a-z]/i) || $event.phone == '') {
      alert('Invalid Phone Number');
    } else {
      this.proposalService.sendProposal($event);
    }
  }
}
