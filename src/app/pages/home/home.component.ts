import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/models/interfaces/game.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  private dataResolver: any;

  public latestGames: Game[] = [];
  public mostVisitedGame!: Game;
  public mostWantedGames: Game[] = [];
  public mostPlayingGame!: Game;
  public mostPlayedGame!: Game;
  public mostVisitedGameCover!: string;
  public mostWantedGamesCovers: string[] = [];
  public mostPlayingGameCover!: string;
  public mostPlayedGameCover!: string;
  private subs = new Subscription();

  ngOnInit(): void {
    this.subs.add(
      this.route.data.subscribe((data) => {
        this.dataResolver = data['resolver'];
        this.latestGames = this.dataResolver.latestGames;
        this.mostVisitedGame = this.dataResolver.mostVisitedGame;
        this.mostWantedGames = this.dataResolver.mostWantedGames;
        this.mostPlayingGame = this.dataResolver.mostPlayingGame;
        this.mostPlayedGame = this.dataResolver.mostPlayedGame;
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
      })
    );
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
