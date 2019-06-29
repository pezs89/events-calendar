import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { EventsService } from '../core/services/events.service';
import { Event } from '../core/models/events';

@Component({
  selector: 'events-view',
  templateUrl: './events-view.component.html',
  styleUrls: ['./events-view.component.scss']
})
export class EventsViewComponent implements OnInit, OnDestroy {
  events: Array<Event>;
  private events$: Subscription;

  constructor(private eventsService: EventsService) {}

  ngOnInit() {
    this.events$ = this.eventsService.eventsChanged$.subscribe(evs => {
      this.events = evs;
    });
    this.eventsService.getEvents();
  }

  ngOnDestroy() {
    this.events$.unsubscribe();
  }
}
