import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizedOrganizersComponent } from './authorized-organizers.component';

describe('AuthorizedOrganizersComponent', () => {
  let component: AuthorizedOrganizersComponent;
  let fixture: ComponentFixture<AuthorizedOrganizersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthorizedOrganizersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorizedOrganizersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
