import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { IgdbService } from '../services/igdb.service'; // Ajusta la importación según tu estructura

@Injectable({
  providedIn: 'root',
})
export class GameResolverService  {
  constructor(private igdbService: IgdbService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const gameId = route.params['id'];
    return this.igdbService.getGame(gameId);
  }
}
