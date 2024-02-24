import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IgdbService } from '../services/igdb.service'; // Ajusta la importación según tu estructura
import { Observable, Subscription, catchError, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IgdbAuthGuard  {
  private subs = new Subscription();

  
  constructor(private igdbService: IgdbService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return of(this.igdbService.hasAuthToken()).pipe(
      switchMap((hasToken) => {
        if (hasToken) {
          return of(true);
        } else {
          return this.igdbService.authAPI().pipe(
            switchMap((resp) => {
              this.igdbService.getAuthToken(resp.access_token);
              return of(true);
            }),
            catchError((err) => {
              this.router.navigate(['/login']);
              return of(false);
            })
          );
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
