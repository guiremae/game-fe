import { Component, Input, OnInit } from '@angular/core';
import { Game } from 'src/app/models/interfaces/game.interface';

@Component({
  selector: 'app-game-details-card',
  templateUrl: './game-details-card.component.html',
  styleUrl: './game-details-card.component.scss',
})
export class GameDetailsCardComponent implements OnInit {
  constructor() {}

  @Input() public game!: Game;
  public coverURL: string =
    'https://t3.ftcdn.net/jpg/02/68/55/60/360_F_268556012_c1WBaKFN5rjRxR2eyV33znK4qnYeKZjm.jpg';
  ngOnInit(): void {
    if (this.game.cover.url)
      this.coverURL =
        'https://' + this.game.cover.url.replace('thumb', '1080p');
  }

  getColor(value: number): string {
    if (value >= 0 && value <= 4) {
      return 'red';
    } else if (value >= 5 && value <= 6) {
      return 'yellow';
    } else if (value >= 7 && value <= 8) {
      return 'green';
    } else if (value == 9) {
      return 'purple';
    } else if (value == 10) {
      return '#C69749';
    } else {
      return 'transparent';
    }
  }
}
