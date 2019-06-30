import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import { Event } from '../../../core/models/events';

@Component({
  selector: 'events-calendar-view',
  templateUrl: './events-calendar-view.component.html',
  styleUrls: ['./events-calendar-view.component.scss']
})
export class EventsCalendarViewComponent implements OnChanges {
  @Input() events: Event[];
  @Output() dateClicked = new EventEmitter<Event>();
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  transformedEvents: Array<any>;

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes.events &&
      changes.events.currentValue !== changes.events.previousValue
    ) {
      this.transformedEvents = this.transformEvents();
    }
  }

  transformEvents(): Array<any> {
    return this.events.map(ev => {
      return {
        id: ev.guId,
        title: ev.title,
        start: ev.startDate,
        end: ev.endDate,
        allDay: ev.isAllDay
      };
    });
  }

  onDateClick(event: any) {
    const newEvent: Event = {
      title: null,
      description: null,
      startDate: Date.parse(event.dateStr),
      endDate: Date.parse(event.dateStr) + 1000,
      location: null,
      isAllDay: false
    };
    this.dateClicked.emit(newEvent);
  }

  onSelect(event: any) {
    const editedEvent: Event = {
      guId: event.event.id,
      title: event.event.title,
      description: event.event.description,
      startDate: Date.parse(event.event.start),
      endDate: Date.parse(event.event.end),
      location: event.event.location,
      isAllDay: event.event.allDay
    };
    this.dateClicked.emit(editedEvent);
  }
}
