import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
} from '@angular/router';
import { Subscription } from 'rxjs';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnDestroy {
  private loaderSubscription: Subscription;
  showContent: boolean = true;

  constructor(private loaderService: LoaderService, private router: Router) {
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

  ngOnDestroy() {
    this.loaderSubscription.unsubscribe();
  }
}
