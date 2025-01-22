import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizedManageClubComponent } from './authorized-manage-club.component';

describe('AuthorizedManageClubComponent', () => {
  let component: AuthorizedManageClubComponent;
  let fixture: ComponentFixture<AuthorizedManageClubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthorizedManageClubComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorizedManageClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
