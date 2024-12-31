import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable, forkJoin, of } from 'rxjs';
import { IgdbService } from '../services/igdb.service';

@Injectable({
  providedIn: 'root',
})
export class LatestGamesResolverService {
  constructor(private igdbService: IgdbService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const date = Math.round(Date.now() / 1000);
    const page = route.params['page'] ? route.params['page'] : 1;
    const title = `Nuevos lanzamientos`;
    return forkJoin({
      games: this.igdbService.findLastGames(date, page),
      page: of(page),
      title: of(title),
    });
  }
}
