import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, style, transition, animate } from '@angular/animations';
import { Subscription } from 'rxjs';

import { SidebarService } from 'src/app/core/services/sidebar.service';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ right: '-400px' }),
        animate('200ms ease-in', style({ right: '0px' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ right: '-400px' }))
      ])
    ])
  ]
})
export class SidebarComponent implements OnInit, OnDestroy {
  isSidebarOpened = false;
  private isSidebarOpened$: Subscription;

  constructor(private sidebarService: SidebarService) {}

  ngOnInit() {
    this.isSidebarOpened$ = this.sidebarService.sidebarStateChanged$.subscribe(
      isOpened => {
        this.isSidebarOpened = isOpened;
      }
    );
  }

  clickedOutside() {
    this.sidebarService.closeSidebar();
  }

  ngOnDestroy() {
    this.isSidebarOpened$.unsubscribe();
  }
}
