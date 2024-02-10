import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Game } from 'src/app/models/interfaces/game.interface';

@Component({
  selector: 'app-game-details-card',
  templateUrl: './game-details-card.component.html',
  styleUrl: './game-details-card.component.scss',
})
export class GameDetailsCardComponent implements OnInit {
  constructor(private elem: ElementRef) {}

  @Input() public game!: Game;
  public coverURL: string =
    'https://t3.ftcdn.net/jpg/02/68/55/60/360_F_268556012_c1WBaKFN5rjRxR2eyV33znK4qnYeKZjm.jpg';
  public rating: number = 0;
  public ratingColor: string = '';
  public ratingText: string = '';

  ngOnInit(): void {
    if (this.game.cover.url)
      this.coverURL = 'https://' + this.game.cover.url.replace('thumb', '720p');
    this.rating = this.game.rating
      ? Math.round((this.game.rating / 10) * 10) / 10
      : 0;
    this.ratingColor = this.getColor(this.rating);
    this.ratingText = this.getRating(this.rating);
    const element = this.elem.nativeElement;
    const circle = element.querySelector('circle');
    if (circle) circle.style.stroke = this.ratingColor;
  }

  getColor(value: number): string {
    if (value >= 0 && value <= 4) {
      return 'red';
    } else if (value >= 5 && value < 7) {
      return 'yellow';
    } else if (value >= 7 && value < 9) {
      return 'green';
    } else if (value >= 9 && value < 10) {
      return 'purple';
    } else if (value == 10) {
      return '#C69749';
    } else {
      return 'transparent';
    }
  }

  getRating(value: number): string {
    if (value >= 0 && value <= 2) {
      return 'Lamentable';
    } else if (value >= 2 && value < 5) {
      return 'Malo';
    } else if (value >= 5 && value < 6) {
      return 'Aceptable';
    } else if (value >= 6 && value <= 7) {
      return 'Bueno';
    } else if (value >= 7 && value < 9) {
      return 'Notable';
    } else if (value >= 9 && value < 10) {
      return 'Excelente';
    } else if (value == 10) {
      return 'Perfecto';
    } else {
      return 'Sin califiación';
    }
  }
}
