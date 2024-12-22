import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, forkJoin, of } from 'rxjs';
import { IgdbService } from '../services/igdb.service';
import { RatingService } from '../services/rating.service';

@Injectable({
  providedIn: 'root',
})
export class GameResolverService {
  constructor(
    private igdbService: IgdbService,
    private ratingService: RatingService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const gameId = route.params['id'];
    return forkJoin({
      game: this.igdbService.getGame(gameId),
      rating: this.ratingService.getRating(gameId),
      websites: this.igdbService.getWebsites(gameId),
    });
  }
}
