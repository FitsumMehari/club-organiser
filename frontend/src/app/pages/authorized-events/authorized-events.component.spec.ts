import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizedEventsComponent } from './authorized-events.component';

describe('AuthorizedEventsComponent', () => {
  let component: AuthorizedEventsComponent;
  let fixture: ComponentFixture<AuthorizedEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthorizedEventsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorizedEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
