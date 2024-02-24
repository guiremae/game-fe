import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IgdbService } from '../services/igdb.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GameResolverService {
  constructor(private igdbService: IgdbService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const gameId = route.params['id'];
    return this.igdbService.getGame(gameId).pipe(
      map((game) => {
        if (game.length === 0) {
          this.router.navigate(['/latest']);
        }
        return game;
      })
    );
  }
}
