import { Component, Input } from '@angular/core';

import { Event } from '../../../core/models/events';

@Component({
  selector: 'events-list-view',
  templateUrl: './events-list-view.component.html',
  styleUrls: ['./events-list-view.component.scss']
})
export class EventsListViewComponent {
  @Input() events: Event[];

  openEventSidebar(event: Event) {
    console.log(event);
  }
}
