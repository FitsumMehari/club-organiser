import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizedAddEventComponent } from './authorized-add-event.component';

describe('AuthorizedAddEventComponent', () => {
  let component: AuthorizedAddEventComponent;
  let fixture: ComponentFixture<AuthorizedAddEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthorizedAddEventComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorizedAddEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
