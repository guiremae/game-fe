import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable, forkJoin, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IgdbService } from '../services/igdb.service';

@Injectable({
  providedIn: 'root',
})
export class PlatformGamesResolverService {
  title: string = '';
  constructor(private igdbService: IgdbService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const date = Math.round(Date.now() / 1000);
    const page = route.params['page'] ? route.params['page'] : 1;
    this.title = `Nuevos lanzamientos para: ${route.params['platform']}`;

    return typeof route.params['platform'] === 'number'
      ? of(route.params['platform'])
      : this.igdbService.getPlatformID(route.params['platform']).pipe(
          switchMap((platform) => {
            const platformID = platform[0]
              ? platform[0].id
              : route.params['platform'];

            // Obtén el nombre de la plataforma
            return forkJoin({
              games: this.igdbService.findLastGamesForPlatform(
                date,
                platformID,
                page
              ),
              page: of(page),
              title: isNaN(Number(route.params['platform']))
                ? of(this.title)
                : this.igdbService
                    .getPlatformName(route.params['platform'])
                    .pipe(
                      switchMap((platform) => {
                        const platformName = platform[0]
                          ? platform[0].name
                          : route.params['platform'];
                        this.title = `Nuevos lanzamientos para: ${platformName}`;
                        return of(this.title);
                      })
                    ),
            });
          })
        );
  }
}
