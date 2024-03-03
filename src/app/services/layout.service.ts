import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private toggleSidenavSubject = new Subject<boolean>();
  toggleSidenav$ = this.toggleSidenavSubject.asObservable();

  private isSidenavOpen = false;

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
    this.toggleSidenavSubject.next(this.isSidenavOpen);
  }
}
