import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendProposalComponent } from './send-proposal.component';

describe('SendProposalComponent', () => {
  let component: SendProposalComponent;
  let fixture: ComponentFixture<SendProposalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SendProposalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
