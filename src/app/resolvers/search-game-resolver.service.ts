import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable, forkJoin, of } from 'rxjs';
import { IgdbService } from '../services/igdb.service';
@Injectable({
  providedIn: 'root',
})
export class SearchGameResolverService {
  constructor(private igdbService: IgdbService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const gameName = route.params['name'];
    const page = route.params['page'] ? route.params['page'] : 1;
    const title = `Resultados para: ${gameName}`;
    return forkJoin({
      games: this.igdbService.findSearchedGames(gameName, page),
      page: of(page),
      title: of(title),
    });
  }
}
