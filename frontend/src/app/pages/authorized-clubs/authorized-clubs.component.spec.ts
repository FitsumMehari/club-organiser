import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizedClubsComponent } from './authorized-clubs.component';

describe('AuthorizedClubsComponent', () => {
  let component: AuthorizedClubsComponent;
  let fixture: ComponentFixture<AuthorizedClubsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthorizedClubsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorizedClubsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
