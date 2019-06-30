import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { EventCardComponent } from './components/event-card/event-card.component';
import { EventFormComponent } from './components/event-form/event-form.component';
import { SidebarComponent } from './components/event-sidebar/sidebar.component';

import { ClickOutsideDirective } from './directives/click-outside.directive';

@NgModule({
  declarations: [EventCardComponent, EventFormComponent, SidebarComponent, ClickOutsideDirective],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [EventCardComponent, EventFormComponent, SidebarComponent, ClickOutsideDirective]
})
export class SharedModule {}
