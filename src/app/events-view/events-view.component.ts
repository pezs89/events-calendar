import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Event } from '../core/models/events';
import { EventsViewMode } from '../core/enums/events-view.mode';

import { EventsService } from '../core/services/events.service';
import { SidebarService } from '../core/services/sidebar.service';

@Component({
  selector: 'events-view',
  templateUrl: './events-view.component.html',
  styleUrls: ['./events-view.component.scss']
})
export class EventsViewComponent implements OnInit, OnDestroy {
  events: Array<Event>;
  eventsViewMode: EventsViewMode = EventsViewMode.CALENDAR;
  private events$: Subscription;

  constructor(
    private eventsService: EventsService,
    private sidebarService: SidebarService
  ) {}

  ngOnInit() {
    this.events$ = this.eventsService.eventsChanged$.subscribe(evs => {
      this.events = evs;
    });
    this.eventsService.getEvents();
  }

  changeViewMode(type: EventsViewMode) {
    if (type !== this.eventsViewMode) {
      this.eventsViewMode = type;
    }
  }

  createNewEvent() {
    this.sidebarService.openSidebar();
  }

  ngOnDestroy() {
    this.events$.unsubscribe();
  }
}
