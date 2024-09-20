import { Injectable } from '@angular/core';
import { lastValueFrom, forkJoin } from 'rxjs';
import { IgdbService } from '../services/igdb.service';

@Injectable({
  providedIn: 'root',
})
export class HomeResolverService {
  constructor(private igdbService: IgdbService) {}

  async resolve(): Promise<any> {
    const date = Math.round(Date.now() / 1000);

    // Aumentamos el límite a 5 para asegurar más variedad
    const latestGames$ = this.igdbService.findLastGames(date, 1);

    const [
      mostVisitedGameIDs,
      mostWantedGamesIDs,
      mostPlayingGameIDs,
      mostPlayedGameIDs,
    ] = await lastValueFrom(
      forkJoin([
        this.igdbService.getMostPopularGames(1, 1),
        this.igdbService.getMostPopularGames(2, 2),
        this.igdbService.getMostPopularGames(3, 4), // Aumentamos el límite a 5
        this.igdbService.getMostPopularGames(4, 5), // Aumentamos el límite a 5
      ])
    );

    // Aquí filtramos para que los juegos no se repitan en cada categoría
    const uniqueGameIDs = new Set();

    const getUniqueGameId = (gameIDs: any[]) => {
      return gameIDs.find((game) => !uniqueGameIDs.has(game.game_id));
    };

    const mostVisitedGameId = getUniqueGameId(mostVisitedGameIDs).game_id;
    uniqueGameIDs.add(mostVisitedGameId);

    const mostWantedGamesIDArray = mostWantedGamesIDs
      .filter((game) => !uniqueGameIDs.has(game.game_id))
      .slice(0, 5)
      .map((game) => {
        uniqueGameIDs.add(game.game_id);
        return game.game_id;
      });

    const mostPlayingGameId = getUniqueGameId(mostPlayingGameIDs).game_id;
    uniqueGameIDs.add(mostPlayingGameId);

    const mostPlayedGameId = getUniqueGameId(mostPlayedGameIDs).game_id;
    uniqueGameIDs.add(mostPlayedGameId);

    // Hacemos las llamadas a los servicios usando los IDs seleccionados
    const [mostVisitedGame, mostWantedGames, mostPlayingGame, mostPlayedGame] =
      await lastValueFrom(
        forkJoin([
          this.igdbService.getGame(mostVisitedGameId),
          this.igdbService.getListGames(mostWantedGamesIDArray),
          this.igdbService.getGame(mostPlayingGameId),
          this.igdbService.getGame(mostPlayedGameId),
        ])
      );

    const latestGames = await lastValueFrom(latestGames$);

    return {
      mostVisitedGame: mostVisitedGame[0],
      mostWantedGames,
      mostPlayingGame: mostPlayingGame[0],
      mostPlayedGame: mostPlayedGame[0],
      latestGames,
    };
  }
}
