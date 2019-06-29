import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EventsViewComponent } from './events-view.component';
import { EventsListViewComponent } from './components/events-list-view/events-list-view.component';
import { EventsCalendarViewComponent } from './components/events-calendar-view/events-calendar-view.component';

import { EventsViewRoutingModule } from './events-view-routing.module';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    EventsViewComponent,
    EventsListViewComponent,
    EventsCalendarViewComponent
  ],
  imports: [CommonModule, SharedModule, EventsViewRoutingModule]
})
export class EventsViewModule {}
