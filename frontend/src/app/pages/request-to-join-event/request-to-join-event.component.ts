import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-request-to-join-event',
  templateUrl: './request-to-join-event.component.html',
  styleUrl: './request-to-join-event.component.css'
})
export class RequestToJoinEventComponent {
constructor(private route:ActivatedRoute){}
  formdetails = {
    left: {
      top: {
        title: 'REQUEST A TICKET',
        description: 'Please fill in the form.',
      }
    },
    right: {
      top: {
        inputs: [
          { label: 'First-Name', type: 'text' },
          { label: 'Email', type: 'email' },
          { label: 'Phone-Number', type: 'tel' },
        ],
      },
      bottom: {
        right: {
          top: "SUBMIT REQUEST",
        }
      },
    },
  };

  handleSubmit($event:any) {
    console.log($event);
    console.log(this.route.snapshot.params["clubID"]);

  }
}
