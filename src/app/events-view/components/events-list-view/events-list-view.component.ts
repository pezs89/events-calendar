import { Component, Input } from '@angular/core';

import { SidebarService } from 'src/app/core/services/sidebar.service';
import { Event } from '../../../core/models/events';

@Component({
  selector: 'events-list-view',
  templateUrl: './events-list-view.component.html',
  styleUrls: ['./events-list-view.component.scss']
})
export class EventsListViewComponent {
  @Input() events: Event[];

  constructor(private sidebarService: SidebarService) {}

  openEventSidebar(event: Event) {
    this.sidebarService.openSidebar();
  }
}
