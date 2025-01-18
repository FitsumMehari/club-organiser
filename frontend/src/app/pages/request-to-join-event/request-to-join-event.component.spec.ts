import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestToJoinEventComponent } from './request-to-join-event.component';

describe('RequestToJoinEventComponent', () => {
  let component: RequestToJoinEventComponent;
  let fixture: ComponentFixture<RequestToJoinEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RequestToJoinEventComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestToJoinEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
