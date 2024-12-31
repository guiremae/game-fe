import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/models/interfaces/game.interface';
import { GamesService } from '../../services/games.service';

@Component({
  selector: 'app-latest',
  templateUrl: './latest.component.html',
  styleUrls: ['./latest.component.scss'],
})
export class LatestComponent implements OnInit {
  constructor(
    public gamesService: GamesService,
    private route: ActivatedRoute
  ) {}

  private dataResolver: any;

  public pageNumber: number = 1;
  public pageTitle: string = 'Nuevos lanzamientos';
  private subs = new Subscription();
  public games: Game[] = [];

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.dataResolver = data['resolver'];
      this.games = this.dataResolver.games;
      this.pageTitle = this.dataResolver.title;
      this.pageNumber = parseInt(this.dataResolver.page);
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public navPages(page: number) {
    this.gamesService.ChangeNumberPage(page);
  }
}
