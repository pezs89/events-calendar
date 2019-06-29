import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Event } from 'src/app/core/models/events';

@Component({
  selector: 'event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent {
  @Input() event: Event;
  @Output() modifyEvent = new EventEmitter<Event>();

  editEvent() {
    this.modifyEvent.emit(this.event);
  }
}
