import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { EventCardComponent } from './components/event-card/event-card.component';

@NgModule({
  declarations: [EventCardComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [EventCardComponent]
})
export class SharedModule {}
