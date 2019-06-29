import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/calendar-view', pathMatch: 'full' },
  {
    path: 'calendar-view',
    loadChildren: () =>
      import('./events-view/events-view.module').then(
        mod => mod.EventsViewModule
      )
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
