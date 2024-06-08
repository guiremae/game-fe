import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ListService } from '../services/list.service';
import { IgdbService } from '../services/igdb.service';

@Injectable({
  providedIn: 'root',
})
export class ListResolverService implements Resolve<any> {
  constructor(
    private listService: ListService,
    private igdbService: IgdbService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const listID = route.params['listid'];

    return this.listService.getListInfo(listID).pipe(
      switchMap((data: any) => {
        // Obtener el título de listInfo
        const title = data.title;
        // Utilizar los datos de listInfo para realizar la otra llamada
        const games = data.games;

        // Si hay juegos en la lista
        if (games.length > 0) {
          // Realizar la otra llamada para obtener información de los juegos
          return this.igdbService.getListGames(games).pipe(
            switchMap((listGames: any[]) => {
              // Ordenar la lista de listGames según el índice de listInfo
              const sortedListGames = games.map((gameId: string) => {
                const game = listGames.find((game) => game.id === gameId);
                if (game) {
                  return { ...game, rating: data.scores[game.id] };
                }
                return null;
              });
              // Devolver un objeto con el título y la lista ordenada de juegos
              return of({ title, games: sortedListGames });
            })
          );
        } else {
          // Si no hay juegos, devolver una lista vacía de juegos
          return of({ title, games: [] });
        }
      })
    );
  }
}
