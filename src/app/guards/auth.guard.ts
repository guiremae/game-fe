import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IgdbService } from '../services/igdb.service'; // Ajusta la importación según tu estructura
import { Observable, Subscription, catchError, of, switchMap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  private subs = new Subscription();

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return of(this.authService.getLoggedInValue() as boolean).pipe(
      switchMap((isLoggedIn) => {
        if (isLoggedIn) {
          return of(true);
        } else {
          this.router.navigate(['/latest']);
          return of(false);
        }
      })
    );
  }

  ngOnDestroy(): void {
    // Asegúrate de cancelar la suscripción en ngOnDestroy para evitar fugas de memoria
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
