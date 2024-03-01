import { Component, Input, OnInit } from '@angular/core';
import { Game } from 'src/app/models/interfaces/game.interface';
import { IgdbService } from '../../services/igdb.service';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss'],
})
export class GameCardComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private modalService: ModalService,
    private listService: ListService
  ) {}

  @Input() public game!: Game;

  public descriptionText: string = '';
  public date!: string;
  public coverURL!: string;
  ngOnInit(): void {
    if (this.game.first_release_date)
      this.date = new Date(
        this.game.first_release_date * 1000
      ).toLocaleDateString('es-ES');
    if (this.game.cover?.url)
      this.coverURL = 'https://' + this.game.cover.url.replace('thumb', '720p');
    this.descriptionText = this.generateDescriptionText();
  }

  onAddToList() {
    const isLogged = this.authService.getLoggedInValue();
    if (isLogged) {
      this.listService.getLists().subscribe(
        (response) => {
          this.modalService.openAddToListModal(response, this.game);
        },
        (error) => {
          this.modalService.openLoginModal();
        }
      );
    } else {
      this.modalService.openLoginModal();
    }
  }

  generateDescriptionText(): string {
    let description = `${this.game.name}`;

    if (this.game.genres != null) {
      description += ` es un ${this.game.genres[0].name} que`;
    }

    if (this.game.genres != null || this.date != null) {
      description += ` ha salido`;
    }

    if (this.game.platforms != null) {
      description += ` en `;
      for (let i = 0; i < this.game.platforms.length; i++) {
        description += `${this.game.platforms[i].name}`;
        if (i < this.game.platforms.length - 2) {
          description += `, `;
        } else if (i === this.game.platforms.length - 2) {
          description += ` y `;
        }
      }
    }

    return description;
  }
}
