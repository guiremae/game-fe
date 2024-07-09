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
  public games!: Game[];

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.dataResolver = data['resolver'];
      this.games = this.dataResolver.games;
      this.pageTitle = this.dataResolver.title;
      this.pageNumber = parseInt(this.dataResolver.page);
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
