import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizedStatusComponent } from './authorized-status.component';

describe('AuthorizedStatusComponent', () => {
  let component: AuthorizedStatusComponent;
  let fixture: ComponentFixture<AuthorizedStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthorizedStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorizedStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
