import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';

import { Event } from '../models/events';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EventsService {
  private events: Event[] = [
    {
      guId: Guid.create().toString(),
      title: 'Engineering Interview',
      location: 'A/III',
      startDate: 1562001060000,
      endDate: 1562001240000,
      isAllDay: false,
      description: 'Engineering Interview'
    },
    {
      guId: Guid.create().toString(),
      title: 'Frontend Conference',
      location: 'Offsite',
      startDate: 1548975600000,
      isAllDay: true,
      description: 'Frontend Conference'
    },
    {
      guId: Guid.create().toString(),
      title: 'Sprint Planning',
      location: 'C/I',
      startDate: 1561978800000,
      endDate: 1561986000000,
      isAllDay: false,
      description: 'Sprint Planning'
    }
  ];

  private eventsChanged: Subject<Event[]> = new Subject<Event[]>();
  eventsChanged$ = this.eventsChanged.asObservable();

  getEvents() {
    this.eventsChanged.next([...this.events]);
  }

  createEvent(newEvent: Event) {
    let event: Event = { ...newEvent };
    if (event.guId) {
      const index = this.events.findIndex(ev => ev.guId === event.guId);
      this.events[index] = event;
    } else {
      event = { ...event, guId: Guid.create().toString() };
      this.events.unshift({ ...event });
    }
    this.getEvents();
  }
}
