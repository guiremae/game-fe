import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/models/interfaces/game.interface';
import { GamesService } from '../../services/games.service';
import { ModalService } from 'src/app/services/modal.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    public gamesService: GamesService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: ModalService,
    private _snackBar: MatSnackBar
  ) {}

  private dataResolver: any;

  public latestGames: Game[] = [];
  public mostVisitedGame!: Game;
  public mostWantedGames: Game[] = [];
  public mostPlayingGame!: Game;
  public mostPlayedGame!: Game;
  public platforms!: any[];
  public platformName: string = '';
  public isThereAnyError: boolean = true;
  public isSearching: boolean = false;
  public pageNumber: number = 1;
  private targetUrl: string = '';
  public searchName: string = '';
  public hasResults: boolean = true;
  public hasResponse: boolean = false;
  public pageTitle: string = 'Nuevos lanzamientos';
  private subs = new Subscription();
  public mostVisitedGameCover!: string;
  public mostWantedGamesCovers: string[] = [];
  public mostPlayingGameCover!: string;
  public mostPlayedGameCover!: string;

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.dataResolver = data['resolver'];
      this.latestGames = this.dataResolver.latestGames;
      this.mostVisitedGame = this.dataResolver.mostVisitedGame;
      this.mostWantedGames = this.dataResolver.mostWantedGames;
      this.mostPlayingGame = this.dataResolver.mostPlayingGame;
      this.mostPlayedGame = this.dataResolver.mostPlayedGame;
    });
    const navigation = window.history.state;

    if (navigation && navigation.openLoginModal === true) {
      this._snackBar.open(
        'Tu sesión ha caducado. Por favor, inicia de nuevo tu sesión',
        undefined,
        {
          duration: 1500,
          panelClass: ['app-notification-error', 'center'],
        }
      );
      this.modalService.openLoginModal();
    }

    this.mostVisitedGameCover = this.mostVisitedGame.cover
      ? `https://${this.mostVisitedGame.cover.url.replace('thumb', '720p')}`
      : 'https://t3.ftcdn.net/jpg/02/68/55/60/360_F_268556012_c1WBaKFN5rjRxR2eyV33znK4qnYeKZjm.jpg';

    this.mostWantedGamesCovers = this.mostWantedGames.map((game) =>
      game.cover
        ? `https://${game.cover.url.replace('thumb', '720p')}`
        : 'https://t3.ftcdn.net/jpg/02/68/55/60/360_F_268556012_c1WBaKFN5rjRxR2eyV33znK4qnYeKZjm.jpg'
    );

    this.mostPlayingGameCover = this.mostPlayingGame.cover
      ? `https://${this.mostPlayingGame.cover.url.replace('thumb', '720p')}`
      : 'https://t3.ftcdn.net/jpg/02/68/55/60/360_F_268556012_c1WBaKFN5rjRxR2eyV33znK4qnYeKZjm.jpg';

    this.mostPlayedGameCover = this.mostPlayedGame.cover
      ? `https://${this.mostPlayedGame.cover.url.replace('thumb', '720p')}`
      : 'https://t3.ftcdn.net/jpg/02/68/55/60/360_F_268556012_c1WBaKFN5rjRxR2eyV33znK4qnYeKZjm.jpg';
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  refreshPage(): void {
    window.location.reload();
  }

  public navPages(page: number) {
    this.gamesService.ChangeNumberPage(page);
  }

  public goToLatest() {
    this.targetUrl = '/latest';
    this.router.navigate([this.targetUrl]);
  }
}
