import { Component, OnInit } from '@angular/core';
import { ProposalService } from '../../services/proposal.service';

@Component({
  selector: 'app-authorized-proposals',
  templateUrl: './authorized-proposals.component.html',
  styleUrl: './authorized-proposals.component.css',
})
export class AuthorizedProposalsComponent implements OnInit {
  constructor(private proposalService: ProposalService) {}
  sortOption:string = ''
  proposals: any = [];
  loading: boolean = false;
  filterInput: any;
  ngOnInit(): void {
    this.proposalService.getAllProposals();
    this.proposalService._response.subscribe((next) => {
      this.proposals = next;
    });
  }

  acceptProposal(proposalId: any) {
    this.proposalService.acceptProposal(proposalId);
    this.loading = true;
  }
  rejectProposal(proposalId: any) {
    this.proposalService.rejectProposal(proposalId);
    this.loading = true;
  }
  sortProposals() {
    if (!this.sortOption) return;

    const [key, order] = this.sortOption.split('-');

    const [keyOne, keyTwo] = key.split('.');

    this.proposals.sort((a: any, b: any) => {
      if (a[keyOne][keyTwo] < b[keyOne][keyTwo]) {
        return order === 'asc' ? -1 : 1;
      }
      if (a[keyOne][keyTwo] > b[keyOne][keyTwo]) {
        return order === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }
}
