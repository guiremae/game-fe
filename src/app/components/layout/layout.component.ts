import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
} from '@angular/router';
import { Subscription } from 'rxjs';
import { LoaderService } from 'src/app/services/loader.service';
import { NavComponent } from '../nav/nav.component';
import { LayoutService } from 'src/app/services/layout.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit, OnDestroy {
  private loaderSubscription: Subscription;
  showContent: boolean = true;
  events: string[] = [];
  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(
    private loaderService: LoaderService,
    private router: Router,
    private layoutService: LayoutService
  ) {
    this.loaderSubscription = this.loaderService.showContent$.subscribe(
      (value) => (this.showContent = value)
    );

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.loaderService.show();
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.loaderService.hide();
      }
    });
  }

  ngOnInit() {
    this.layoutService.toggleSidenav$.subscribe(() => {
      this.sidenav.toggle();
    });
  }

  ngOnDestroy() {
    this.loaderSubscription.unsubscribe();
  }
}
