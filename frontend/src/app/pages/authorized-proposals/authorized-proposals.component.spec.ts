import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizedProposalsComponent } from './authorized-proposals.component';

describe('AuthorizedProposalsComponent', () => {
  let component: AuthorizedProposalsComponent;
  let fixture: ComponentFixture<AuthorizedProposalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthorizedProposalsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorizedProposalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
