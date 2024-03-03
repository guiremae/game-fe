import { Injectable, ErrorHandler, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(
    private router: Router,
    private ngZone: NgZone,
    private _snackBar: MatSnackBar
  ) {}

  handleError(error: any): void {
    this.ngZone.run(() => {
      // Redirigir a la pantalla principal
      this.router.navigate(['/latest']);

      this._snackBar.open('Página no encontrada', undefined, {
        duration: 1500,
        panelClass: ['app-notification-error', 'center'],
      });
    });
  }
}
