// loader.service.ts
import { Injectable } from '@angular/core';
import { Subject, take, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loaderSubject = new Subject<boolean>();
  loaderState$ = this.loaderSubject.asObservable();
  private showContentSubject = new Subject<boolean>();
  showContent$ = this.showContentSubject.asObservable();

  show() {
    this.loaderSubject.next(true);
    this.showContentSubject.next(false);
  }

  hide() {
    timer(1)
      .pipe(take(1))
      .subscribe(() => {
        this.loaderSubject.next(false);
        this.showContentSubject.next(true);
      });
  }

  reset() {
    this.loaderSubject.next(false);
    this.showContentSubject.next(true);
  }
}
