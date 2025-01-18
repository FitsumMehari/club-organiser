import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestToJoinClubComponent } from './request-to-join-club.component';

describe('RequestToJoinClubComponent', () => {
  let component: RequestToJoinClubComponent;
  let fixture: ComponentFixture<RequestToJoinClubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RequestToJoinClubComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestToJoinClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
