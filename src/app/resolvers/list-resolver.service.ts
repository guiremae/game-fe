import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { lastValueFrom, Observable, of } from 'rxjs';
import { ListService } from '../services/list.service';
import { IgdbService } from '../services/igdb.service';

@Injectable({
  providedIn: 'root',
})
export class ListResolverService {
  constructor(
    private listService: ListService,
    private igdbService: IgdbService
  ) {}

  public async resolve(
    route: ActivatedRouteSnapshot
  ): Promise<{ title: string; games: any[] }> {
    const listID = route.params['listid'];

    const data = await lastValueFrom(this.listService.getListInfo(listID));
    const title = data.title;
    const games = data.games;
    if (games.length > 0) {
      const listGames = await lastValueFrom(
        this.igdbService.getListGames(games)
      );
      const sortedListGames = games.map((gameId: number) => {
        const game = listGames.find((game) => game.id === gameId);
        if (game) {
          return { ...game, rating: data.scores ? data.scores[game.id] : null };
        }
        return null;
      });
      return { title, games: sortedListGames };
    } else {
      return { title, games: [] };
    }
  }
}
