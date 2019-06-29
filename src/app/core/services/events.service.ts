import { Injectable } from '@angular/core';

import { Event } from '../models/events';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EventsService {
  private events: Event[] = [
    {
      title: 'Engineering Interview',
      location: 'A/III',
      startDate: 1562001060000,
      endDate: 1562001240000,
      isAllDay: false,
      description: 'Engineering Interview'
    },
    {
      title: 'Frontend Conference',
      location: 'Offsite',
      startDate: 1548975600000,
      isAllDay: true,
      description: 'Frontend Conference'
    },
    {
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
}
