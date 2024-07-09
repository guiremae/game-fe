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
import { environment } from 'src/environments/environment';

@Injectable()
export class GlobalInterceptor implements HttpInterceptor {
  private requestsCount = 0;
  private apiURL: string = environment.apiUrl;

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
        if (error.status === 418 && req.url.startsWith(this.apiURL)) {
          // If we get a 418, call refreshToken and retry the request
          return this.authService.refreshToken().pipe(
            switchMap(() => {
              // Clone the original request and retry it
              const clonedRequest = req.clone();
              return next.handle(clonedRequest);
            }),
            catchError((refreshError) => {
              // If refreshToken fails, call logout
              this.authService.logout(true);
              return throwError(refreshError);
            })
          );
        }
        // If it's not a 418, throw the error
        return throwError(error);
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
}
