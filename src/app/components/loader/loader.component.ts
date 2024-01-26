// loader.component.ts
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-loader',
  template: `
    <div class="loader-overlay" *ngIf="show">
      <div class="loader"></div>
    </div>
  `,
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnDestroy {
  show: boolean = false;
  private subscription: Subscription;

  constructor(private loaderService: LoaderService) {
    this.subscription = this.loaderService.loaderState$.subscribe(
      (state) => (this.show = state)
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
