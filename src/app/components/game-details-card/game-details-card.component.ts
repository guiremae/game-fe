import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Game } from 'src/app/models/interfaces/game.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ListService } from 'src/app/services/list.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-game-details-card',
  templateUrl: './game-details-card.component.html',
  styleUrl: './game-details-card.component.scss',
})
export class GameDetailsCardComponent implements OnInit {
  constructor(
    private elem: ElementRef,
    private authService: AuthService,
    private modalService: ModalService,
    private listService: ListService
  ) {}

  @Input() public game!: Game;
  public coverURL: string =
    'https://t3.ftcdn.net/jpg/02/68/55/60/360_F_268556012_c1WBaKFN5rjRxR2eyV33znK4qnYeKZjm.jpg';
  public ratingColor: string = '';
  public ratingText: string = '';
  public starsArray: any[] = [];
  public mediaStarsArray: any[] = [];
  public aggregatedRating: number = 0;
  @Input() public videos: any[] = [];
  @Input() public pictures: any[] = [];

  ngOnInit(): void {
    if (this.game.cover && this.game.cover.url)
      this.coverURL = 'https://' + this.game.cover.url.replace('thumb', '720p');
    this.ratingColor = this.getColor(this.game.rating);
    this.ratingText = this.getRating(this.game.rating);
    this.aggregatedRating = this.game.aggregated_rating
      ? this.game.aggregated_rating / 10
      : 0;
    this.updateStars();
    this.updateMediaStars();
  }

  ngAfterViewInit(): void {
    this.setCircleColor();
  }

  getColor(value: number): string {
    if (value >= 0 && value < 5) {
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

  onEditRating() {
    const isLogged = this.authService.getLoggedInValue();
    if (isLogged) {
      this.modalService
        .openEditRatingModal(this.game)
        .subscribe((rating: number) => {
          if (rating) {
            this.game.rating = rating;
            this.updateStars();
            this.ratingColor = this.getColor(this.game.rating);
            this.ratingText = this.getRating(this.game.rating);
            this.setCircleColor();
          }
        });
    } else {
      this.modalService.openLoginModal();
    }
  }

  updateStars() {
    const ratingAdapted = Math.floor(this.game.rating / 2);
    const fullStars =
      this.game.rating / 2 - ratingAdapted > 1
        ? ratingAdapted + 1
        : ratingAdapted;

    const halfStar = this.game.rating / 2 - ratingAdapted > 0.5;
    const totalStars = 5;

    this.starsArray = Array(totalStars).fill({ icon: 'star_border' });

    for (let i = 0; i < fullStars; i++) {
      this.starsArray[i] = { icon: 'star' };
    }

    if (halfStar && fullStars < totalStars) {
      this.starsArray[fullStars] = { icon: 'star_half' };
    }
  }

  updateMediaStars() {
    const ratingAdapted = Math.floor(this.aggregatedRating / 2);
    const fullStars =
      this.aggregatedRating / 2 - ratingAdapted > 1
        ? ratingAdapted + 1
        : ratingAdapted;

    const halfStar = this.aggregatedRating / 2 - ratingAdapted > 0.5;
    const totalStars = 5;

    this.mediaStarsArray = Array(totalStars).fill({ icon: 'star_border' });

    for (let i = 0; i < fullStars; i++) {
      this.mediaStarsArray[i] = { icon: 'star' };
    }

    if (halfStar && fullStars < totalStars) {
      this.mediaStarsArray[fullStars] = { icon: 'star_half' };
    }
  }

  getStarBackground(rating: number, index: number): string {
    const fullStar = 1;
    const ratingValue = Math.max(0, Math.min(fullStar, rating - index));
    return `linear-gradient(90deg, gold ${ratingValue * 100}%, lightgray ${
      ratingValue * 100
    }%)`;
  }

  private setCircleColor() {
    const element = this.elem.nativeElement;
    const circle = element.querySelector('circle');
    if (circle) circle.style.stroke = this.ratingColor;
  }
}
