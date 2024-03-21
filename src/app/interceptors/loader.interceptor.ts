// loader.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from '../services/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  private requestsCount = 0;

  constructor(private loaderService: LoaderService) {}

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
