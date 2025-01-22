import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizedAddEventDetailsComponent } from './authorized-add-event-details.component';

describe('AuthorizedAddEventDetailsComponent', () => {
  let component: AuthorizedAddEventDetailsComponent;
  let fixture: ComponentFixture<AuthorizedAddEventDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthorizedAddEventDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorizedAddEventDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
