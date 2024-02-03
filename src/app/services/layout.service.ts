import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private toggleSidenavSubject = new Subject<boolean>();
  toggleSidenav$ = this.toggleSidenavSubject.asObservable();

  toggleSidenav() {
    this.toggleSidenavSubject.next(true);
  }
}
