import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SidebarService {
  private sidebarStateChanged: Subject<boolean> = new Subject<boolean>();
  sidebarStateChanged$ = this.sidebarStateChanged.asObservable();

  openSidebar() {
    this.sidebarStateChanged.next(true);
  }

  closeSidebar() {
    this.sidebarStateChanged.next(false);
  }
}
