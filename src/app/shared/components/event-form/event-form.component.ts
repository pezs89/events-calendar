import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ValidatorFn
} from '@angular/forms';

import { Event } from 'src/app/core/models/events';

const MinDateValidation: ValidatorFn = (formGroup: FormGroup) => {
  const startDate = formGroup.get('startDate').value;
  const endDate = formGroup.get('endDate').value;
  return startDate !== null &&
    endDate !== null &&
    Date.parse(startDate) < Date.parse(endDate)
    ? null
    : { range: true };
};

@Component({
  selector: 'event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {
  @Input() eventDetails: Event;
  @Output() formSubmitted = new EventEmitter<Event>();
  submitted = false;
  eventForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initializeForm();
  }

  getControl(key: string) {
    return this.eventForm.get(key);
  }

  initializeForm() {
    if (!this.eventDetails) {
      this.eventDetails = {
        guId: null,
        title: null,
        description: null,
        startDate: new Date().getTime(),
        endDate: new Date().getTime() + 1000,
        isAllDay: false,
        location: null
      };
    }
    this.eventForm = this.fb.group({
      guId: [this.eventDetails.guId],
      title: [this.eventDetails.title, Validators.required],
      description: [this.eventDetails.description, Validators.required],
      dates: this.fb.group(
        {
          startDate: [
            new Date(this.eventDetails.startDate).toISOString().slice(0, -5),
            Validators.required
          ],
          endDate: [
            new Date(this.eventDetails.endDate).toISOString().slice(0, -5)
          ]
        },
        { validator: MinDateValidation }
      ),
      isAllDay: [this.eventDetails.isAllDay, Validators.required],
      location: [this.eventDetails.location, Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.eventForm.valid) {
      const event: Event = {
        ...this.eventForm.value,
        startDate: Date.parse(this.eventForm.value.dates.startDate),
        endDate: Date.parse(this.eventForm.value.dates.endDate)
      };
      this.formSubmitted.emit(event);
      this.eventForm.reset();
    }
  }
}
