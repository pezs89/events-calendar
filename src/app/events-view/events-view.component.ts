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
  eventDetails: Event;
  isSidebarOpened: boolean;
  eventsViewMode: EventsViewMode = EventsViewMode.LIST;
  private events$: Subscription;
  private isSidebarOpened$: Subscription;

  constructor(
    private eventsService: EventsService,
    private sidebarService: SidebarService
  ) {}

  ngOnInit() {
    this.events$ = this.eventsService.eventsChanged$.subscribe(evs => {
      this.events = evs;
    });
    this.isSidebarOpened$ = this.sidebarService.sidebarStateChanged$.subscribe(
      isOpened => {
        this.isSidebarOpened = isOpened;
        this.eventDetails = null;
      }
    );
    this.eventsService.getEvents();
  }

  changeViewMode(type: EventsViewMode) {
    if (type !== this.eventsViewMode) {
      this.eventsViewMode = type;
    }
  }

  openSidebar() {
    this.sidebarService.openSidebar();
  }

  editEvent(event: Event) {
    this.openSidebar();
    let editableEvent: Event;
    if (event.guId) {
      editableEvent = { ...this.events.find(ev => ev.guId === event.guId) };
    } else {
      editableEvent = { ...event };
    }
    this.eventDetails = editableEvent;
  }

  onFormSubmitted(event: Event) {
    this.eventsService.createEvent(event);
    this.sidebarService.closeSidebar();
  }

  ngOnDestroy() {
    this.events$.unsubscribe();
    this.isSidebarOpened$.unsubscribe();
  }
}
