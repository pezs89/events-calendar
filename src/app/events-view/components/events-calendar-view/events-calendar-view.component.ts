import { Component, Input } from '@angular/core';

import { Event } from '../../../core/models/events';

@Component({
  selector: 'events-calendar-view',
  templateUrl: './events-calendar-view.component.html',
  styleUrls: ['./events-calendar-view.component.scss']
})
export class EventsCalendarViewComponent {
  @Input() events: Event[];
}
