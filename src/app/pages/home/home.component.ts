import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/models/interfaces/game.interface';
import { IgdbService } from 'src/app/services/igdb.service';
import { GamesService } from '../../services/games.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    public gamesService: GamesService,
    private igdb: IgdbService,
    private renderer: Renderer2,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  private dataResolver: any;

  public latestGames: Game[] = [];
  public platforms!: any[];
  private dateNow: number = 0;
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
  private lastAction: string = '';
  public games!: Game[];

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

  refreshPage(): void {
    window.location.reload();
  }

  /*   checkParams(action: string, page?: number): void {
    this.lastAction = action;
    if (action === 'latest') {
      this.gamesService.FindLatestGames();
    } else if (action === 'page') {
      this.route.params.subscribe((params) => {
        this.gamesService.ChangeNumberPage(Number(params['page']));
      });
    } else if (action === 'search') {
      this.route.params.subscribe({
        next: (params) => {
          if (params['page']) this.pageNumber = Number(params['page']);
          this.gamesService.SearchGame(params['name']);
        },
        error: (err) => {
          
        },
      });
    } else {
      this.route.params.subscribe((params) => {
        if (params['page']) this.pageNumber = Number(params['page']);
        this.gamesService.getPlatformGames(params['platform']);
      });
    }
  } */

  public navPages(page: number) {
    // this.route.params.subscribe(params => {
    //   this.platformName = params['platform']
    //   this.searchName = params['name']
    //   if(!this.platformName  && !this.searchName)
    //   this.targetUrl = "/latest/" + page
    //   else if (!this.searchName)
    //   this.targetUrl = '/' + this.platformName + '/' + page
    //   else if (!this.platformName)
    //   this.targetUrl = '/search/' + this.searchName + '/' + page
    //   this.router.navigate([this.targetUrl])
    // })
    this.gamesService.ChangeNumberPage(page);
  }

  public goToLatest() {
    this.targetUrl = '/latest';
    this.router.navigate([this.targetUrl]);
  }
}
