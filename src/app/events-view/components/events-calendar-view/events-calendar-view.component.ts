import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import { Event } from '../../../core/models/events';

@Component({
  selector: 'events-calendar-view',
  templateUrl: './events-calendar-view.component.html',
  styleUrls: ['./events-calendar-view.component.scss']
})
export class EventsCalendarViewComponent implements OnInit {
  @Input() events: Event[];
  @Output() dateClicked = new EventEmitter<Event>();
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  transformedEvents: Array<any>;

  ngOnInit() {
    this.transformedEvents = this.transformEvents();
  }

  transformEvents(): Array<any> {
    return this.events.map(ev => {
      return {
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
}
