import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {

  @Input() formDetails:any
  @Output() eventSubmit = new EventEmitter()

  submit(formValues: any) {
    this.eventSubmit.emit(formValues)
  }
}
