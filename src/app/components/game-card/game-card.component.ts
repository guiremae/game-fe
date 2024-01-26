import { Component, Input, OnInit } from '@angular/core';
import { Game } from 'src/app/models/interfaces/game.interface';
import { IgdbService } from '../../services/igdb.service';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss'],
})
export class GameCardComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private modalService: ModalService
  ) {}

  @Input() public game!: Game;

  public date!: string;
  public coverURL!: string;
  ngOnInit(): void {
    if (this.game.first_release_date)
      this.date = new Date(
        this.game.first_release_date * 1000
      ).toLocaleDateString('es-ES');
    if (this.game.cover?.url)
      this.coverURL =
        'https://' + this.game.cover.url.replace('thumb', '1080p');
  }

  onAddToList() {
    const isLogged = this.authService.getLoggedInValue();
    if (isLogged) {
      this.modalService.openAddToListModal();
    } else {
      this.modalService.openLoginModal();
    }
  }
}
