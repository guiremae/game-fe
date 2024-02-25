import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from 'src/app/models/interfaces/game.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  constructor(private route: ActivatedRoute) {}

  private dataResolver: any;
  public games: any[] = [];
  public title: string = '';

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.dataResolver = data['resolver'];
      this.games = this.dataResolver.games;
      console.log(this.games);
      this.title = this.dataResolver.title;
    });
  }

  getRoundRating(rating: number): number {
    return Math.round((rating / 10) * 10) / 10;
  }

  getColor(value: number): string {
    if (value >= 0 && value <= 40) {
      return 'red';
    } else if (value >= 50 && value < 70) {
      return 'yellow';
    } else if (value >= 70 && value < 90) {
      return 'green';
    } else if (value >= 90 && value < 100) {
      return 'purple';
    } else if (value == 100) {
      return '#C69749';
    } else {
      return 'transparent';
    }
  }
}
