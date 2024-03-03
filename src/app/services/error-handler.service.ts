import { Injectable, ErrorHandler, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private router: Router, private ngZone: NgZone) {}

  handleError(error: any): void {
    this.ngZone.run(() => {
      // Redirigir a la pantalla principal
      this.router.navigate(['/latest']);
    });
  }
}
