import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { LoaderService } from '../services/loader.service';

@Injectable()
export class GlobalInterceptor implements HttpInterceptor {
  private requestsCount = 0;

  constructor(
    private authService: AuthService,
    private loaderService: LoaderService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const excludeLoader = req.headers.has('X-Exclude-Loader');

    if (!excludeLoader) {
      this.requestsCount++;
      if (this.requestsCount === 1) {
        this.loaderService.show();
      }
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (req.url.includes('refresh')) {
          this.authService.logout(true);
          return next.handle(req);
        } else {
          switch (error.status) {
            case 418:
              return this.handle418Error(req, next);
            default:
              return throwError(() => error);
          }
        }
      }),
      finalize(() => {
        if (!excludeLoader) {
          this.requestsCount--;
          if (this.requestsCount === 0) {
            this.loaderService.hide();
          }
        }
      })
    );
  }

  private handle418Error(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.refreshToken().pipe(
      switchMap(() => {
        const clonedRequest = req.clone();
        return next.handle(clonedRequest);
      })
    );
  }
}
